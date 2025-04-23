import {apiAddEventAttendee} from "../../action/ApiActions";
import {useNavigate} from "react-router-dom";

const Modal = ({ closeModal, dataList, eventId, handleAdd}) => {

    const addAttendee = async (user) => {
        console.log(user.id)
        console.log(eventId)
        apiAddEventAttendee(eventId,user.id)
            .then(res => {
                console.log("atteendee added")
                closeModal();
                handleAdd();
            })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10">
                <h2 className="text-2xl font-semibold mb-4">Select Items to Add</h2>
                <ul className="mb-4">
                    {dataList.map((item, index) => (
                        <li key={index} className="py-2 border-b last:border-0 flex justify-between items-center">
                            {item.username}
                            <button onClick={() => addAttendee(item)} className="ml-2 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-700">
                                Add
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


export default Modal;