import { useContext, useEffect, useState } from 'react';
import './App.css';
import Header from './Component/Header';
import Post from './Component/Post';
import UploadFile from './Component/UploadFile';
import { PostList } from './Context';
import db, { auth } from './Firebase';


function App() {

  const [posts, setPosts] = useState([
    // {
    //   id: 1,
    //   post: {
    //     address: "USA",
    //     image: "https://itviec.com/blog/wp-content/uploads/2020/07/react-native-la-gi-social.png",
    //     userName: "Jin",
    //     caption: "Share document with everyone"
    //   }

    // },

    // {
    //   id: 2,
    //   post: {
    //     address: "Japan",
    //     image: "https://i.ytimg.com/vi/Dorf8i6lCuk/maxresdefault.jpg",
    //     userName: "kayto",
    //     caption: "Hello...."
    //   }

    // },
    // {
    //   id: 3,
    //   post: {
    //     address: "VietNam",
    //     image: "https://blog.tinohost.com/wp-content/uploads/2020/10/coverreactjs-la-gi.jpeg",
    //     userName: "JK",
    //     caption: "Share share share...."
    //   }
    // }
  ]);
  // const [user, setUser] = useState(null);
  const { userName, user, setUser, address } = useContext(PostList)

  console.log(user);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //login success
        // console.log(authUser);
        setUser(authUser);

      } else {
        setUser(null);
      }
    })
    return () => {
      unsubcribe();
    }
  }, [user, userName])

  useEffect(() => {
    db.collection('instagram-clone').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      console.log(snapshot.docs.map(doc => (doc.data())), "snapshot")
      setPosts([...posts, ...snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() }))]);
    })
  }, [])

  console.log({ userName, address });
  console.log(user, "app user")

  return (

    <div className="App">

      <Header />
      {user ? (<UploadFile userName={user.displayName} email={user.email} />) : ""}

      {posts.map(({ post, id }) => {
        console.log({ id })
        return (<Post user={user} key={id} postId={id} image={post.image} userName={post.userName} caption={post.caption} />)
      })}

    </div>

  );
}

export default App;
