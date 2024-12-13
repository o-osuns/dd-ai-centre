import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import ChatBox from '../components/ChatBox';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = () => {
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');
      const message = chatInput.value;
      if (!message) return;      

      chatInput.value = '';
      chatBody.innerHTML += `<div class="chat-message chat-message-user">${message}</div>`;
      chatBody.innerHTML += `<div class="chat-message chat-message-bot">Hello, I am DD AI. How can I help you?</div>`;
  };

  const handleClearChat = () => {
    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML = '';
  }

  return (
    <>      
      <MobileNav />
      <div id="mm-0" class="mm-page mm-slideout">
        <div id='preloader' style={{display: `${isLoaded ? 'none': ''}`}}></div>

        <div id='page'>
          <Header />
          <div class="sub-header">
            <div class="container">
              <div class="row">
                <div class="col-md-9 col-sm-12"></div>
              </div>
            </div>
          </div>

          <main style={{ transform: 'none' }}>
            <div class="item-list-summary" style={{ transform: 'none' }}>
              <div class="container" style={{ transform: 'none' }}>
                <div class="row" style={{ transform: 'none' }}>              
                  <ChatBox handleClearChat={handleClearChat} handleSubmit={handleSubmit} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;