// src/components/SurveyList.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { apiFetchSurveys } from '../../action/ApiActions';
import { toast } from 'react-toastify';
import AsideLeft from '../../component/AsideLeft';
import InfiniteScroll from 'react-infinite-scroll-component';
import MobileNavBar from '../../component/MobileNavBar';
import { AsideRight } from '../../component/AsideRight';
import { AiOutlineArrowUp } from 'react-icons/ai';

const SurveyList = () => {
  const hasFetchedData = useRef(false);
  const [surveys, setSurveys] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [hasMore, setHasMore] = useState(false);

  const onEnter = (e) => {
    setKeyword(e.target.value);
    setSurveys([]); // Reset resources when new keyword is entered
    setPage(0);
    fetchSurveys(e.target.value, 0);
  };

  const fetchSurveys = async (key = keyword, currentPage = page) => {
    setPage((currentPage) => currentPage + 1);
    const response = await apiFetchSurveys({ "keyword": key, "size": 7, "page": currentPage + 1 });
    if (response.status) {
      setSurveys(prevItems => currentPage === 0 ? response.data.content : [...prevItems, ...response.data.content]);
      setHasMore(!response.data.last);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchSurveys("");
      hasFetchedData.current = true;
    }
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <MobileNavBar />
      <div className="flex justify-center px-5 sm:px-32 md:mt-4">
        <div className="flex h-screen w-screen">
          <AsideLeft />
          <main className="md:mx-4 w-full sm:basis-2/3">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Surveys</h1>
            <InfiniteScroll
              dataLength={surveys.length}
              next={fetchSurveys}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
            >
              {surveys.map((survey) => (
                <div key={survey.id} className="mb-4 p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                  <Link to='/home' className="text-lg font-semibold text-blue-600 hover:underline">
                    {survey.title}
                  </Link>
                </div>
              ))}
            </InfiniteScroll>
          </main>
          <AsideRight onEnter={onEnter} />
          <a href="#" className="hidden sm:block fixed bottom-0 right-20 bg-blue-300 text-white text-5xl p-3 rounded-full mb-2 mr-20 hover:bg-blue-500 transition duration-200">
            <AiOutlineArrowUp />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SurveyList;
