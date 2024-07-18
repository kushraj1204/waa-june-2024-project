import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetchSurveys, apiCreateSurvey, apiUpdateSurvey, apiDeleteSurvey } from '../../action/ApiActions';
import { toast } from 'react-toastify';
import AsideLeft from '../../component/AsideLeft';
import InfiniteScroll from 'react-infinite-scroll-component';
import MobileNavBar from '../../component/MobileNavBar';
import { AsideRight } from '../../component/AsideRight';
import { AiOutlineArrowUp, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import SurveyPopup from './SurveyPopup';
import ConfirmDelete from './ConfirmDelete';

const Surveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [editSurvey, setEditSurvey] = useState(null);
  const [deleteSurveyId, setDeleteSurveyId] = useState(null);
  const navigate = useNavigate();

  const onEnter = (e) => {
    setKeyword(e.target.value);
    setSurveys([]);
    setPage(0);
    fetchSurveys(e.target.value, 0);
  };

  const fetchSurveys = async (key = keyword, currentPage = page) => {
    setPage(currentPage + 1);
    const response = await apiFetchSurveys({ keyword: key, size: 7, page: currentPage + 1 });
    if (response.status) {
      setSurveys(prevItems => currentPage === 0 ? response.data.content : [...prevItems, ...response.data.content]);
      setHasMore(!response.data.last);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (surveys.length === 0) {
      fetchSurveys();
    }
  }, []);

  const handleSave = async (title) => {
    try {
      const response = editSurvey 
        ? await apiUpdateSurvey(editSurvey.id, { title })
        : await apiCreateSurvey({ title });

      if (response.status) {
        toast.success(`Survey ${editSurvey ? 'updated' : 'created'} successfully`);
        fetchSurveys(keyword, 0);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
    setShowPopup(false);
  };

  const handleDelete = async () => {
    try {
      const response = await apiDeleteSurvey(deleteSurveyId);

      if (response.status) {
        toast.success('Survey deleted successfully');
        fetchSurveys(keyword, 0);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
    setShowConfirmDelete(false);
  };

  return (
    <div className="container mx-auto p-4">
      <MobileNavBar />

      <div className="flex justify-center px-4 sm:px-20 md:mt-4">
        <div className="flex h-full w-full">
          <AsideLeft />

          <main className="md:mx-4 w-full sm:basis-2/3">
            <h1 className="text-2xl font-bold mb-4">Surveys</h1>

            <button 
              onClick={() => { setShowPopup(true); setEditSurvey(null); }} 
              className="block mb-4 text-blue-500 hover:text-blue-700 font-semibold"
            >
              + Create Survey
            </button>

            <InfiniteScroll
              dataLength={surveys.length}
              next={fetchSurveys}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              className="space-y-3"
            >
              {surveys.map((survey) => (
                <div key={survey.id} className="bg-white shadow-md rounded-md p-4 hover:bg-gray-100 transition duration-200 flex justify-between items-center">
                  <button
                    onClick={() => { setShowPopup(true); setEditSurvey(survey); }}
                    className="text-lg font-medium text-blue-600 hover:underline flex-grow text-left"
                  >
                    {survey.title}
                  </button>
                  <div className="flex space-x-2">
                    <AiOutlineEdit
                      onClick={() => { setShowPopup(true); setEditSurvey(survey); }}
                      className="text-gray-600 hover:text-blue-600 cursor-pointer"
                    />
                    <AiOutlineDelete
                      onClick={() => { setShowConfirmDelete(true); setDeleteSurveyId(survey.id); }}
                      className="text-gray-600 hover:text-red-600 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </main>

          <AsideRight onEnter={onEnter} />
          <a href="#">
            <AiOutlineArrowUp className="fixed bottom-4 right-4 bg-blue-500 text-white text-3xl p-2 rounded-full hover:bg-blue-600" />
          </a>
        </div>
      </div>

      <SurveyPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onSave={handleSave}
        initialTitle={editSurvey ? editSurvey.title : ''}
      />

      <ConfirmDelete
        show={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Surveys;
