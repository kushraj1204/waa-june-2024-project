import { Link } from "react-router-dom";
import ResourceFile from "./ResourceFile";
import { apiDownloadResource } from "../../action/ApiActions";
import { useEffect, useRef, useState } from "react";

function Resource(props) {
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [filename, setFilename] = useState("");
    const downloadLinkRef = useRef(null);
    function downloadFile(file) {
        setFilename(file);
        const response = apiDownloadResource({ filename: file }, props.resource.id);
        response.then(result => {
            const url = URL.createObjectURL(result);
            setDownloadUrl(url);
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        if (downloadUrl) {
            downloadLinkRef.current.click();
        }
    }, [downloadUrl]);


    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-semibold mb-2">{props.resource.title}</h3>
            <p className="text-gray-600 mb-4">{props.resource.description}</p>

            {
                !props.resource.files ? (
                    <Link to={`/resources/${props.resource.id}`} className="text-blue-500 hover:underline">
                        View
                    </Link>
                ) : (
                    <></>
                )
            }
            {
                props.resource.files ? (
                    <>
                        {
                            props.resource.files.map((file) => {
                                return (
                                    <div key={file}>
                                        <ResourceFile downloadFile={downloadFile}  file={file} url={props.resource.url} />
                                    </div>
                                )
                            })
                        }
                        <a href={downloadUrl} ref={downloadLinkRef} download={filename} style={{ display: 'none' }}>Download</a>
                    </>
                ) : (
                    <></>
                )
            }


        </div>
    );
}

export default Resource;