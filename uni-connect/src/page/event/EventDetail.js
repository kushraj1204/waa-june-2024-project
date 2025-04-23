import {useParams} from "react-router";
import {lazy, Suspense, useEffect, useState} from "react";
import axios from "axios";
import {apiFetchEventAttendees, apiFetchEventById, apiFetchUsers} from "../../action/ApiActions";
import MobileNavBar from "../../component/MobileNavBar";
import AsideLeft from "../../component/AsideLeft";
import {AsideRight} from "../../component/AsideRight";
import {AiOutlineArrowUp} from "react-icons/ai";
import Modal from "./Modal";

const AttendeeList =
    lazy(() => import('./Attendees'));

function EventDetail() {
    const {id} = useParams();
    const [data, setData] = useState({});
    const [attendees, setAttendees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([])

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchEventAttendees = async () => {
        apiFetchEventAttendees(id, itemsPerPage, currentPage)
            .then(res => {
                setAttendees(res.data.content)
                setLoading(false);
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        apiFetchEventById(id)
            .then(res => setData(res.data))
            .catch(e => console.log(e))
        fetchEventAttendees();
        apiFetchUsers()
            .then(res => {
                setUsers(res.data.content);
            })
    }, [id, currentPage, itemsPerPage]);

    const handleNewParticipantAddEvent = () => {
        setIsModalOpen(true);
    }

    let newParticipants = [];
    if(users.length> 0){
        newParticipants = users.filter(u => !attendees.find(a => a.username === u.username));
    }

    return <div>
        <MobileNavBar/>
        <div className="flex justify-center px-5 sm:px-32 md:mt-4">
            <div className="flex h-screen w-screen">
                <AsideLeft/>
                <main className="md:mx-4 w-full sm:basis-2/3">
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4" key={data.id}>
                        <h3 className="text-lg font-semibold mb-2">{data.name}</h3>
                        <p className="text-gray-600 mb-4">{data.description}</p>
                        <p className="text-gray-600 mb-4">Place: {data.location}</p>
                        <p className="text-gray-600 mb-4">Date: {data.date}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        {loading ? <div></div> :
                            <Suspense fallback={<p>Loading component...</p>}>
                                <AttendeeList data={attendees}/>
                            </Suspense>}
                    </div>
                    <div>
                        <button
                            onClick={handleNewParticipantAddEvent}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add new participant
                        </button>
                        {isModalOpen && <Modal closeModal={closeModal}
                                               dataList={newParticipants}
                                               eventId={id}
                                                handleAdd={fetchEventAttendees}/>}
                    </div>
                </main>
                <AsideRight/>
                <a href="#">
                    <AiOutlineArrowUp
                        className="hidden sm:block fixed bottom-0 right-20 bg-blue-300 text-slate-50 text-5xl p-3 rounded-full mb-2 mr-20 hover:bg-blue-500"/>
                </a>
            </div>
        </div>
    </div>
}

export default EventDetail;