import * as React from 'react';
import ListGalleryItem from './ListGalleryItem';
import firebase from "../../Global/firebase_setup";
const { useCallback, useEffect, useState } = React;
import "./ListGallery.scss";

interface ListGalleryProps {
    files: JSX.Element
}

const ListGallery: React.FC = () => {
    const ref = firebase.firestore();
    const [files, setFiles] = useState<(ListGalleryProps["files"]|null)[]>([null]);
    
    const fetchListGalleryItems = useCallback(async() => {
        const files = await ref.collection("HomeListGallery");
        const allFiles: JSX.Element[] = [];
        files.onSnapshot(snaps => {
            snaps.forEach((snap) => {
                const snapData = snap.data();
                const {title, subtitle, mediaURL, mediaAlt, additionalBox, videoCover, downloadGif, imageURL, name} = snapData;
                allFiles.push(<ListGalleryItem title={title} subtitle={subtitle} mediaURL={mediaURL} mediaAlt={mediaAlt} additionalBox={additionalBox} videoCover={videoCover} downloadGif={downloadGif} imageURL={imageURL} name={name} key={title}/>)
            })
            setFiles(allFiles)
        })
    }, [ref]);

useEffect(() => {
    fetchListGalleryItems()
}, [fetchListGalleryItems])

    return (
        <div className="list-gallery_wrapper">
            {files}
        </div>
    )
}

export default ListGallery