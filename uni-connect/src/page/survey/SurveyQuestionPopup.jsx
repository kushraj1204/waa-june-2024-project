import React, { useState, useEffect } from 'react';

const QuestionPopup = ({ show, onClose, onSave, initialQuestion }) => {
  const [question, setQuestion] = useState(initialQuestion ? initialQuestion.question : '');
  const [dueDate, setDueDate] = useState(initialQuestion ? initialQuestion.dueDate : '');

  useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion.question);
      setDueDate(initialQuestion.dueDate);
    } else {
      setQuestion('');
      setDueDate('');
    }
  }, [initialQuestion]);

  if (!show) return null;

  const handleSave = () => {
    onSave({ question, dueDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">{initialQuestion ? 'Edit Question' : 'Create Question'}</h2>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded mb-4"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded mb-4"
          placeholder="Due Date (YYYY-MM-DD)"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPopup;
