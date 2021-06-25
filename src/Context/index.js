import { createContext, useState } from "react";

export const PostList = createContext();

const PostListContextProvider = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const [user, setUser] = useState(null);

    return (
        <PostList.Provider value={{
            email, setEmail, password, setPassword, userName,
            setUserName, user, setUser
        }}>
            {props.children}
        </PostList.Provider>
    );
}
export default PostListContextProvider;