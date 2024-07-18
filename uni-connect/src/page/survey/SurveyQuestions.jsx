import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetchSurveyQuestions, submitSurveyAnswers } from '../../action/ApiActions';
import { toast } from 'react-toastify';
import MobileNavBar from '../../component/MobileNavBar';
import AsideLeft from '../../component/AsideLeft';
import { AiOutlineArrowUp } from 'react-icons/ai';

const SurveyQuestions = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await apiFetchSurveyQuestions(id);
      if (response.status) {
        setQuestions(response.data);
      } else {
        toast.error(response.message);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    const formattedAnswers = questions.map((question) => ({
      surveyQuestionId: question.id,
      response: answers[question.id] || '',
      submissionDate: answers[question.submissionDate] || '2024-01-01',
    }));

    try {
      const response = await submitSurveyAnswers(formattedAnswers);
      if (response.status) {
        toast.success("Survey submitted successfully!");
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      toast.error("Failed to submit survey.");
    }
  };

  return (
    <div className="container mx-auto p-4">
    <MobileNavBar />

    <div className="flex justify-center px-5 sm:px-32 md:mt-4">
      <div className="flex h-screen w-screen">
        <AsideLeft />

        <main className="md:mx-4 w-full sm:basis-2/3">

        <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Survey</h1>
      <div className="grid gap-4">
        {questions.map((question) => (
          <div key={question.id} className="mb-4">
            <h2 className="text-xl font-semibold">{question.question}</h2>
            <textarea
              className="border border-gray-300 p-2 mt-2 w-full"
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
        {/* <AsideRight onEnter={onEnter} /> */}
          <a href="#">
            <AiOutlineArrowUp className="hidden sm:block fixed bottom-0 right-20 bg-blue-300 text-slate-50 text-5xl p-3 rounded-full mb-2 mr-20 hover:bg-blue-500" />
          </a>
        </div>
        </div>
        </div>







   
  );
};

export default SurveyQuestions;
