import React, { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { apiFetchResources } from '../../action/ApiActions';
import MobileNavBar from '../../component/MobileNavBar';
import AsideLeft from '../../component/AsideLeft';
import { AsideRight } from '../../component/AsideRight';
import Resource from './Resource';
import InfiniteScroll from 'react-infinite-scroll-component';

function Resources() {
    const hasFetchedData = useRef(false);
    const [resources, setResources] = useState([]);
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [hasMore, setHasMore] = useState(false);

    const onEnter = (e) => {
        setKeyword(e.target.value);
        setResources([]); // Reset resources when new keyword is entered
        setPage(0);
        fetchResources(e.target.value, 0);
    };

    const fetchResources = async (key = keyword, currentPage = page) => {
        setPage((currentPage)=>currentPage+1);
        const response = await apiFetchResources({ "keyword": key, "size": 7, "page": currentPage+1 });
        if (response.status) {
            setResources(prevItems => currentPage === 0 ? response.data.content : [...prevItems, ...response.data.content]);
            setHasMore(!response.data.last);
        } else {
            toast.error(response.message);
        }
    };

    useEffect(() => {
        if (!hasFetchedData.current) {
            fetchResources("");
            hasFetchedData.current = true;
        }
    }, [page]);

    return (
        <div>
            <MobileNavBar />

            <div className="flex justify-center px-5 sm:px-32 md:mt-4">
                <div className="flex h-screen w-screen">
                    <AsideLeft />

                    <main className="md:mx-4 w-full sm:basis-2/3">
                        <h1 className="text-3xl font-bold mb-6">Resources</h1>
                        <InfiniteScroll
                            dataLength={resources.length}
                            next={fetchResources}
                            hasMore={hasMore}
                            key={crypto.randomUUID()}
                            loader={<h4>Loading...</h4>}
                        >
                            {resources.map((resource) => (
                                <>
                                <Resource key={resource.id} resource={resource} />
                                </>

                            ))}
                        </InfiniteScroll>

                    </main>

                    <AsideRight onEnter={onEnter} />
                    <a href="#">
                        <AiOutlineArrowUp className="hidden sm:block fixed bottom-0 right-20 bg-blue-300 text-slate-50 text-5xl p-3 rounded-full mb-2 mr-20 hover:bg-blue-500" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Resources;
