import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiFetchProfile, apiSaveProfile } from "../../action/ApiActions";
import MobileNavBar from "../../component/MobileNavBar";
import AsideLeft from "../../component/AsideLeft";
import { AsideRight } from "../../component/AsideRight";
import { AiOutlineArrowUp } from "react-icons/ai";
import EditModal from "./EditModal";
import { toast } from "react-toastify";

function Profile() {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editType, setEditType] = useState('');

  const openModal = (data, type) => {
    setEditData(data);
    setEditType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditData(null);
    setEditType('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(editData)
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    closeModal();
    setProfile({...profile,[editType]:[editData]});
    saveProfile({...profile,[editType]:[editData]});
  };

  const [profile, setProfile] = useState({ achievements: [], interests: [], extraCurricularActivities: [] });

  useEffect(() => {
    fetchProfile();
  }, [params.id]);

  async function fetchProfile() {
    const response = await apiFetchProfile(params.id);
    if (response.status) {
      setProfile(response.data);
    } else {
      toast.error(response.message);
    }
  }

  async function saveProfile(data) {
    const response = await apiSaveProfile(params.id,data);
    if (response.status) {
      setProfile(response.data);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div>
      <MobileNavBar />

      <div className="flex justify-center px-5 sm:px-32 md:mt-4">
        <div className="flex h-screen w-screen">
          <AsideLeft />

          <main className="md:mx-4 w-full sm:basis-2/3">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Achievements</h2>
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                  <p className="text-lg font-semibold">University: <span className="font-normal">{achievement.university}</span></p>
                  <p className="text-lg font-semibold">Majors: <span className="font-normal">{achievement.majors}</span></p>
                  <p className="text-lg font-semibold">Level: <span className="font-normal">{achievement.level}</span></p>
                  <p className="text-lg font-semibold">Score: <span className="font-normal">{achievement.score}</span></p>
                  <button onClick={() => openModal(achievement, 'achievements')} className="mt-2 text-blue-500">Edit</button>
                </div>
              ))}

              <h2 className="text-xl font-bold mt-8 mb-4">Interests</h2>
              {profile.interests.map((interest, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                  <p className="text-lg font-semibold">Interest: <span className="font-normal">{interest.interest}</span></p>
                  <button onClick={() => openModal(interest, 'interests')} className="mt-2 text-blue-500">Edit</button>
                </div>
              ))}

              <h2 className="text-xl font-bold mt-8 mb-4">Extra-Curricular Activities</h2>
              {profile.extraCurricularActivities.map((activity, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                  <p className="text-lg font-semibold">Activity: <span className="font-normal">{activity.activity}</span></p>
                  <p className="text-lg font-semibold">Institute: <span className="font-normal">{activity.institute}</span></p>
                  <p className="text-lg font-semibold">Accomplishment: <span className="font-normal">{activity.accomplishment}</span></p>
                  <button onClick={() => openModal(activity, 'extraCurricularActivities')} className="mt-2 text-blue-500">Edit</button>
                </div>
              ))}
            </div>
          </main>

          <AsideRight />
          <a href="#">
            <AiOutlineArrowUp className="hidden sm:block fixed bottom-0 right-20 bg-blue-300 text-slate-50 text-5xl p-3 rounded-full mb-2 mr-20 hover:bg-blue-500" />
          </a>
        </div>
      </div>

      {isModalOpen && (
        <EditModal
          data={editData}
          type={editType}
          closeModal={closeModal}
          handleChange={handleChange}
          handleSave={handleSave}
        />
      )}
    </div>
  );
}

export default Profile;
