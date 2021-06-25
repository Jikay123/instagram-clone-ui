import { Button, Input } from '@material-ui/core';
import firebase from 'firebase';
import React, { useState } from 'react';
import { db, storage } from '../../Firebase';

function UploadFile({ userName, email }) {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    // const { userName, address } = useContext(PostList);
    // console.log({ userName, address })

    const handleOnChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () => {
        // console.log("upload");
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        console.log(uploadTask, "console");
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                alert(error.message);
            },
            () => {
                storage.ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('instagram-clone').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            image: url,
                            userName: userName,
                        })
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    })
            }
        )
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: "60%", margin: "10px auto" }}>
            <progress className="imageUpload__progress" value={progress} max="100" />
            <Input type="text" placeholder="Input caption your post..." value={caption} onChange={(e) => setCaption(e.target.value)} />
            <Input type="file" onChange={handleOnChange} />
            <Button onClick={handleUpload} variant="contained" color="secondary">Upload</Button>
        </div>
    )
}

export default UploadFile
