import React, { useEffect } from "react";
import Chat from "./components/chat/Chat.jsx";
import Detail from "./components/detail/Detail.jsx";
import List from "./components/list/List.jsx";
import Login from "./components/login/Login.jsx";
import Notification from "./components/notification/Notification.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase.js";
import { useUserStore } from "./lib/userStore.js";
import { useChatStore } from "./lib/chatStore.js";
import './lib/authListener';
import backGround from "./public/16999.jpg";
import Navbar from '../Navbar/Navbar';
import closeIcon from "../Assets/close.png";
import { useNavigate, Link } from "react-router-dom";

// Inline CSS styles
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  .body {
    background-image: url(${backGround});
    background-size: cover;
    display: flex;
    align-items: center;
    color: white;
    justify-content: center;
    height: 100vh;
  }
  .content01 {
    width: 90vw;
    height: 90vh;
    background-color: rgba(34, 34, 34, 0.47);
    backdrop-filter: blur(15px) saturate(150%);
    border-radius: 15px;
    display: flex;
    flex-direction: row;
  }
  .loading {
    padding: 30px;
    font-size: 60px;
    font-weight: 600;
    border-radius: 50px;
    margin: 5%;
    padding: 15% 0;
    background-color: rgba(54, 54, 54, 0.668);
    text-align: center;
  }

  .loader {
    --main-color: #ecf0f1;
    --point-color: #555;
    --size: 5px;
    background-color: var(--main-color);
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000;
  }

  .loader__element {
    border-radius: 100%;
    border: var(--size) solid var(--point-color);
    margin: calc(var(--size) * 2);
  }

  .loader__element:nth-child(1) {
    animation: preloader .6s ease-in-out alternate infinite;
  }
  .loader__element:nth-child(2) {
    animation: preloader .6s ease-in-out alternate .2s infinite;
  }
  .loader__element:nth-child(3) {
    animation: preloader .6s ease-in-out alternate .4s infinite;
  }

  @keyframes preloader {
    100% {
      transform: scale(2);
    }
  }
`;

const App = () => {
  const navigate = useNavigate();
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loader">
          <span className="loader__element"></span>
          <span className="loader__element"></span>
          <span className="loader__element"></span>
        </div>
      </div>
    );
  }

  function handleClose() {
    navigate("/Pages/Home"); // Navigate to the home page
  }

  return (
    <div className="body">
      <div className="content01">
        <img src={closeIcon} alt="Close" className="close-icon" onClick={handleClose} />
        {currentUser ? (
          <>
            <List />
            {chatId && <Chat />}
            {chatId && <Detail />}
          </>
        ) : (
          <Login />
        )}
        <Notification />
      </div>
    </div>
  );
};

// Append styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default App;
