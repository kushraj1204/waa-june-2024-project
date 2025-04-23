import { NavLink } from "react-router-dom";
import {AiFillHome, AiOutlineForm, AiOutlineHome, AiOutlineTags} from "react-icons/ai";
import {MdExplore, MdOutlineBookmark, MdOutlineBookmarkBorder, MdOutlineExplore} from "react-icons/md";
import {FaRegUser, FaUser} from "react-icons/fa";
import {BiEditAlt} from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AsideLeft() {
    const { userId } = useContext(AuthContext);
    return (
        <aside className="hidden sm:block basis-1/6 lg:basis-1/5">

            <header className="flex font-bold text-blue-600 mx-5 my-4 text-xl xl:text-2xl">
                <NavLink to="/home"> University Connect </NavLink>
            </header>

            {/* <CreatePostModal /> */}

            <nav>
                <ul className="px-2 mr-1">
                    <li >
                        <NavLink to="/home" className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) =>
                                isActive ? (
                                    <>
                                        <AiFillHome className="text-[1.6rem] font-bold" />
                                        <h2 className="text-xl px-1 hidden xl:block font-bold"> Home </h2>
                                    </>
                                ) : (
                                    <>
                                        <AiOutlineHome className="text-[1.6rem]" />
                                        <h2 className="text-xl px-1 hidden xl:block"> Home </h2>
                                    </>
                                )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/resources" className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) =>
                                isActive ? (
                                    <>
                                        <MdExplore className="text-[1.6rem] font-bold" />
                                        <h2 className="text-xl px-1 hidden xl:block font-bold"> Resources </h2>
                                    </>
                                ) : (
                                    <>
                                        <MdOutlineExplore className="text-[1.6rem]" />
                                        <h2 className="text-xl px-1 hidden xl:block"> Resources </h2>
                                    </>
                                )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/events" className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) =>
                                isActive ? (
                                    <>
                                        <MdOutlineBookmark className="text-[1.6rem] font-bold" />
                                        <h2 className="text-xl px-1 hidden xl:block font-bold"> Events </h2>
                                    </>
                                ) : (
                                    <>
                                        <MdOutlineBookmarkBorder className="text-[1.6rem]" />
                                        <h2 className="text-xl px-1 hidden xl:block"> Events </h2>
                                    </>
                                )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/students`} className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) =>
                                isActive ? (
                                    <>
                                        <FaUser className="text-[1.6rem] font-bold" />
                                        <h2 className="text-xl px-1 hidden xl:block"> Students </h2>
                                    </>
                                ) : (
                                    <>
                                        <FaRegUser className="text-[1.6rem]" />
                                        <h2 className="text-xl px-1 hidden xl:block"> Students </h2>
                                    </>
                                )}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/surveys`} className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) =>
                            isActive ? (
                                <>
                                <AiOutlineForm className="text-[1.6rem] font-bold" />
                                <h2 className="text-xl px-1 hidden xl:block">Surveys</h2>
                                </>
                            ) : (
                                <>
                                <AiOutlineForm className="text-[1.6rem]" />
                                <h2 className="text-xl px-1 hidden xl:block">Surveys</h2>
                                </>
                            )}
                        </NavLink>
</li>

                    <li>
                        <NavLink to={`/users/${userId}/profile`} className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) =>
                                isActive ? (
                                    <>
                                        <FaUser className="text-[1.6rem] font-bold" />
                                        <h2 className="text-xl px-1 hidden xl:block"> Profile </h2>
                                    </>
                                ) : (
                                    <>
                                        <FaRegUser className="text-[1.6rem]" />
                                        <h2 className="text-xl px-1 hidden xl:block"> Profile </h2>
                                    </>
                                )}
                        </NavLink>
                    </li>
                    <li>
                    <li>
                        <NavLink to={`/categories`} className="flex py-4 gap-3 px-3 cursor-pointer hover:bg-slate-200 rounded-[15rem] active:bg-slate-100">
                            {({ isActive }) =>
                            isActive ? (
                                <>
                                <AiOutlineTags className="text-[1.6rem] font-bold" />
                                <h2 className="text-xl px-1 hidden xl:block">Category</h2>
                                </>
                            ) : (
                                <>
                                <AiOutlineTags className="text-[1.6rem]" />
                                <h2 className="text-xl px-1 hidden xl:block">Category</h2>
                                </>
                            )}
                        </NavLink>
</li>

                    </li>
                    <li className="my-2 mx-1">
                        <button
                            className="hidden xl:block my-8 mx-0 p-2 rounded-[10rem] w-full text-x cursor-pointer text-center 
                        font-semibold text-white bg-blue-600 hover:bg-blue-800"
                            onClick={() => {}}>
                            Post
                        </button>

                        <BiEditAlt
                            className="w-9 h-9 pl-0 rounded-full block xl:hidden cursor-pointer"
                            onClick={() => {}}>
                        </BiEditAlt>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default AsideLeft;