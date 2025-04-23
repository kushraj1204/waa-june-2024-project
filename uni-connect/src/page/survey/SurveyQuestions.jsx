import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiCreateSurveyQuestion, apiDeleteSurveyQueston, apiFetchSurveyQuestions, submitSurveyAnswers } from '../../action/ApiActions';
import { toast } from 'react-toastify';
import MobileNavBar from '../../component/MobileNavBar';
import AsideLeft from '../../component/AsideLeft';
import { AiOutlineArrowUp, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import QuestionPopup from './SurveyQuestionPopup';
import ConfirmDelete from '../common/ConfirmDelete';

const SurveyQuestions = () => {
  let { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteSurveyId, setDeleteSurveyId] = useState(null);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await apiFetchSurveyQuestions(id); // TODO: Remove
        if (response.status) {
          setQuestions(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error('Failed to fetch survey questions:', error);
        toast.error('Failed to fetch survey questions.');
      }
    };

    fetchQuestions();
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    const formattedAnswers = questions.map((question) => ({
      surveyQuestionId: question.id,
      response: answers[question.id] || '',
      submissionDate: '2024-01-01', // Placeholder date; ensure it's a valid format
    }));

    try {
      const response = await submitSurveyAnswers(formattedAnswers);
      if (response.status) {
        toast.success('Survey submitted successfully!');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Failed to submit survey:', error);
      toast.error('Failed to submit survey.');
    }
  };

  const handleEditQuestion = (question) => {
    setCurrentQuestion(question);
    setShowQuestionPopup(true);
  };

  const handleNewQuestion = () => {
    setCurrentQuestion(null);
    setShowQuestionPopup(true);
  };

  const handleSaveQuestion = async (question,dueDate) => {
    try {
        const response =await apiCreateSurveyQuestion({surveyId: id, question,dueDate:'2022-01-01' });

      if (response.status) {
        toast.success(`Survey Question created successfully`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  
  const handleDelete = async () => {
    try {
      const response = await apiDeleteSurveyQueston(deleteSurveyId);
      if (response.status) {
        toast.success('Survey Question deleted successfully');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };
  return (
    <div className="container mx-auto p-4">
      <MobileNavBar />

      <div className="flex justify-center px-5 sm:px-32 md:mt-4">
        <div className="flex h-screen">
          <AsideLeft />

          <main className="md:ml-4 w-full sm:flex-1">
            <div className="container mx-auto p-4">
              <div className="flex justify-between mb-4 items-center">
                <h1 className="text-3xl font-bold">Survey Question</h1>
                <button
                  onClick={handleNewQuestion}
                  className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  <AiOutlinePlus className="mr-2" /> New Question
                </button>
              </div>
              <div className="grid gap-4">
                {questions.map((question) => (
                  <div key={question.id} className="bg-white shadow-md rounded p-4">
                    <div className="flex items-center mb-2">
                      <h2 className="text-xl font-semibold mr-2">{question.question}</h2>
                      <button
                        onClick={() => handleEditQuestion(question)}
                        className="text-blue-500 mr-2 hover:underline"
                      >
                        <AiOutlineEdit />
                      </button>
                   

                      <AiOutlineDelete
                      onClick={() => { setShowConfirmDelete(true); setDeleteSurveyId(question.id); }}
                      className="text-gray-600 hover:text-red-600 cursor-pointer"
                    />
                    </div>
                    <textarea
                      className="border border-gray-300 p-2 mt-2 w-full rounded"
                      placeholder="Enter your answer"
                      value={answers[question.id] || ''}
                      onChange={(e) => handleChange(question.id, e.target.value)}
                    />
                  </div>
                ))}
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Submit Survey
                </button>
              </div>
            </div>
          </main>

          <a href="#" className="scroll-to-top bg-blue-300 text-slate-50 text-5xl p-3 rounded-full fixed bottom-0 right-20 hidden sm:block hover:bg-blue-500">
            <AiOutlineArrowUp />
          </a>
        </div>
      </div>

      <QuestionPopup
        show={showQuestionPopup}
        onClose={() => setShowQuestionPopup(false)}
        onSave={handleSaveQuestion}
        initialQuestion={currentQuestion}
      />
        <ConfirmDelete
        show={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default SurveyQuestions;
