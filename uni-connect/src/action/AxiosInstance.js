import axios from 'axios';
import ApiRoutes, { API_BASE_URL } from "../constant/ApiRoutes";
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const AxiosInterceptor = ({ children }) => {

  const { logIn, logOut } = useContext(AuthContext);

  axiosInstance.interceptors.request.use(function (config) {
    const token = JSON.parse(sessionStorage.getItem('user'))?.accessToken ?? "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    else{
      logoutAction();
    }
    return config;
  }, function (error) {
    console.log('Request Interceptor Error:', error);
    return Promise.reject(error);
  });


  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      console.log("Error in api response",error)
      if (error?.response?.status === 403 && !originalRequest._retry) {
        console.log("Probably token expired or attempt made for unauthorized resource");
        originalRequest._retry = true;
        //attempting login with refresh token
        const refreshTokenResponse = await refreshToken();
        console.log(refreshTokenResponse);
        if (refreshTokenResponse && refreshTokenResponse.status == 200) {
          //trying the original failed request after getting new token from refresh token
          originalRequest.headers['Authorization'] = `Bearer ${refreshTokenResponse.data.data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      }
      throw error;
    }
  );


  function loginAction(response) {
    sessionStorage.setItem("user", JSON.stringify(response.data.data));
    logIn(response.data.data);

  }

  function logoutAction() {
    logOut();
    sessionStorage.removeItem('user');
  }


  const refreshToken = async () => {
    try {
      const refreshToken = JSON.parse(sessionStorage.getItem('user'))?.refreshToken ?? "";
      if (refreshToken) {
        const response = await axios.post(ApiRoutes.refreshTokenSignIn, { refreshToken: refreshToken });
        console.log("apiRefreshTokenLogin response", response);
        if (response.status == 200) {
          loginAction(response);
          return response;
        }
        else {
          logoutAction();
        }
      }
      else {
        console.log("No Refresh Token in memory");
        logoutAction();
      }
      return { status: 403 };
    } catch (error) {
      console.error('Error in refreshing token:', error);
      logoutAction();
      return { status: 403 };
    }
  };


  return children;

}


export default axiosInstance;
export { AxiosInterceptor };
