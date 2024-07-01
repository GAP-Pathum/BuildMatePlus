import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from '../Components/ChatWindow/ChatFeed';
import LoginForm from '../Components/ChatWindow/LoginForm';
import './Chat.css';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/footer';

const Chat = () => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  if (!username || !password) {
    return <LoginForm />;
  }

  return (
    <>
      <div className='Archi-nav' style={{ backgroundColor: '#FF6B00' }}>
        <Navbar />
      </div>
      <ChatEngine
        height="100vh"
        projectID="8bf99a30-df97-4d7e-b76a-a9e19052d8ca"
        userName={username}
        userSecret={password}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      />
      <Footer />
    </>
  );
};

export default Chat;
