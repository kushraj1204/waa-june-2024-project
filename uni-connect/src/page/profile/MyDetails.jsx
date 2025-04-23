import EditModal from "./EditModal";
import { toast } from "react-toastify";
import { apiFetchProfile, apiSaveProfile } from "../../action/ApiActions";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function MyDetails() {
    const params = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [editType, setEditType] = useState('');

    const openModal = (data, type) => {
        setEditData(data?data:(type=='achievements'?{univesity:"",majors:"",level:"",score:""}:(type=='interests')?{interest:""}:{activity:"",institute:"",accomplishment:""}));
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
        setProfile({ ...profile, [editType]: [editData] });
        saveProfile({ ...profile, [editType]: [editData] });
    };

    const [profile, setProfile] = useState({ achievements: [], interests: [], extraCurricularActivities: [] });

    useEffect(() => {
        fetchProfile();
    }, [params.id]);

    async function fetchProfile() {
        console.log(params)
        const response = await apiFetchProfile(params.userId);
        if (response.status) {
            console.log("sas",response)
            setProfile(response.data?response.data:{ achievements: [], interests: [], extraCurricularActivities: [] });
        } else {
            toast.error(response.message);
        }
    }

    async function saveProfile(data) {
        const response = await apiSaveProfile(params.userId, data);
        if (response.status) {
            setProfile(response.data);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }


    return (

        <>
            <h1 className="text-3xl font-bold mb-6">My Details</h1>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Achievements</h2>
                {profile.achievements.map((achievement, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                        <p className="text-lg font-semibold">University: <span className="font-normal">{achievement.university}</span></p>
                        <p className="text-lg font-semibold">Majors: <span className="font-normal">{achievement.majors}</span></p>
                        <p className="text-lg font-semibold">Level: <span className="font-normal">{achievement.level}</span></p>
                        <p className="text-lg font-semibold">Score: <span className="font-normal">{achievement.score}</span></p>

                    </div>
                ))}
                        <button onClick={() => openModal(profile.achievements[0], 'achievements')} className="mt-2 text-blue-500">Edit</button>
                <h2 className="text-xl font-bold mt-8 mb-4">Interests</h2>
                {profile.interests.map((interest, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                        <p className="text-lg font-semibold">Interest: <span className="font-normal">{interest.interest}</span></p>

                    </div>
                ))}
                        <button onClick={() => openModal(profile.interests[0], 'interests')} className="mt-2 text-blue-500">Edit</button>
                <h2 className="text-xl font-bold mt-8 mb-4">Extra-Curricular Activities</h2>
                {profile.extraCurricularActivities.map((activity, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm">
                        <p className="text-lg font-semibold">Activity: <span className="font-normal">{activity.activity}</span></p>
                        <p className="text-lg font-semibold">Institute: <span className="font-normal">{activity.institute}</span></p>
                        <p className="text-lg font-semibold">Accomplishment: <span className="font-normal">{activity.accomplishment}</span></p>

                    </div>
                ))}
                        <button onClick={() => openModal(profile.extraCurricularActivities[0], 'extraCurricularActivities')} className="mt-2 text-blue-500">Edit</button>
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
        </>
    );
}

export default MyDetails;