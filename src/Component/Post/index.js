import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase';
import firebase from 'firebase';
import './post.scss';

function Post({ image, userName, caption, postId, user }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');


    useEffect(() => {
        let unsubcribe;
        if (postId) {
            unsubcribe = db
                .collection('instagram-clone')
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => (doc.data())))
                })
        }
        return () => {
            unsubcribe();
        };
    }, [postId]);

    const handlePostComment = (e) => {
        e.preventDefault();
        db.collection("instagram-clone").doc(postId).collection("comments").add({
            text: comment,
            userName: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setComment('');
    }
    return (
        <div className="Post">
            <div className="Post__info">
                <Avatar>
                </Avatar>
                <div className="Post__info--text">
                    <h4>{userName}</h4>
                </div>
            </div>
            <img className="Post__img" src={image} alt="image_post" />
            <div className="Post__caption">
                <h4>{userName}</h4>
                <p>{caption}</p>
            </div>
            <div className="Post__comment">
                {comments.map((comment) => {
                    return (
                        <p>
                            <strong>{comment.userName} </strong>
                            {comment.text}
                        </p>
                    );
                })}
            </div>
            {user ? (<form className="Post__commentBox">
                <input className="Post__commentBox--input" type="text" placeholder="Add a comment...."
                    value={comment} onChange={(e) => setComment(e.target.value)} />
                <button className="Post__commentBox--button" disabled={!comment}
                    type="submit" onClick={handlePostComment}
                >Post</button>
            </form>) : null}

        </div>
    )
}

export default Post
