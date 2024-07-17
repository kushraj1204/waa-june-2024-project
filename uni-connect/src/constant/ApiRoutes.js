export const SITE_BASE_URL = "http://localhost:8084/";
export const API_BASE_URL = SITE_BASE_URL+"api/v1/";

export default {
  signin: API_BASE_URL + "auth/sign-in",
  refreshTokenSignIn: API_BASE_URL + "auth/sign-in/refresh-token",
  signup: API_BASE_URL + "auth/sign-up",
  users: API_BASE_URL + "users",
  profile: (userId) => `${API_BASE_URL}users/${userId}/profile`,
  resource: (resourceId) => `${API_BASE_URL}resources/${resourceId}`,
  resources: API_BASE_URL + "resources",
  surveys: API_BASE_URL+ "surveys",
  resourceDownload: (resourceId) => `${API_BASE_URL}resources/${resourceId}/download`,
};