import React from 'react';

const EditModal = ({ data, type, closeModal, handleChange, handleSave }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit {type}</h2>
        {type === 'achievements' && (
          <>
            <label className="block mb-2">University</label>
            <input
              type="text"
              name="university"
              value={data.university}
              onChange={handleChange}
              className="block w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label className="block mb-2">Majors</label>
            <input
              type="text"
              name="majors"
              value={data.majors}
              onChange={handleChange}
              className="block w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label className="block mb-2">Level</label>
            <input
              type="text"
              name="level"
              value={data.level}
              onChange={handleChange}
              className="block w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label className="block mb-2">Score</label>
            <input
              type="text"
              name="score"
              value={data.score}
              onChange={handleChange}
              className="block w-full mb-4 p-2 border border-gray-300 rounded"
            />
          </>
        )}
        {type === 'interests' && (
          <>
            <label className="block mb-2">Interest</label>
            <input
              type="text"
              name="interest"
              value={data.interest}
              onChange={handleChange}
              className="block w-full mb-4 p-2 border border-gray-300 rounded"
            />
          </>
        )}
        {type === 'extraCurricularActivities' && (
          <>
            <label className="block mb-2">Activity</label>
            <input
              type="text"
              name="activity"
              value={data.activity}
              onChange={handleChange}
              className="block w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label className="block mb-2">Institute</label>
            <input
              type="text"
              name="institute"
              value={data.institute}
              onChange={handleChange}
              className="block w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label className="block mb-2">Accomplishment</label>
            <input
              type="text"
              name="accomplishment"
              value={data.accomplishment}
              onChange={handleChange}
              className="block w-full mb-4 p-2 border border-gray-300 rounded"
            />
          </>
        )}
        <div className="flex justify-end">
          <button onClick={closeModal} className="mr-4 text-gray-700">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
