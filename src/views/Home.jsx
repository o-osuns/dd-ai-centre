import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import ChatBox from '../components/ChatBox';
import ChatPreference from '../components/ChatPreference';
import axios from 'axios';
import Loader from '../components/loader/Loader';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobilityPromptSelected, setMobilityPromptSelected] = useState(false);
  const [aiResponse, setAiResponse] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value;
    if (!message) return;

    let prompt = '';

    if (mobilityPromptSelected) {
      prompt = `Convert the following natural language query into SQL without explanations: 
                  Schema: 
                    1. client: (id, name, email, description, isAutoTopUpEnabled) 
                    2. subbucket: (id, volume, usedVolume, isExpired, isActive, topUpVolume, client_id, expiryMonth) 
                    3. client_has_device: (client_id, device_imei, date_assigned, status). 
                  Note: that expiryMonth is a full date, the client table contains the list of all our clients, 
                        there are two options for status, 0 means the client is yet to assign the device and 1 means it has been assigned. 
                        The subbucket table contains how much data was assigned to a client. 
                  Query: ${message}`;
    }else {
      prompt = message;
    }

    try {
      const response = await axios.post('http://197.156.243.44:11434/api/generate', { model: 'llama3:latest', prompt: prompt, stream: false});
      if (response.data?.done) {
        setAiResponse(prevState => [...prevState, { userMessage: message, botMessage: response.data?.response }]);
      } else {
        setAiResponse(prevState => [...prevState, { userMessage: message, botMessage: 'Sorry I cannot provide a feeback because the model is still processing!' }]);
      }
    } catch (error) {
      console.log(error);
      setAiResponse(prevState => [...prevState, { userMessage: message, botMessage: 'Sorry I cannot provide a feeback because an exception occurred!'}]);
    } finally {
      setIsLoading(false);
    }    
  };

  const handleClearChat = () => {
    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML = '';
    setAiResponse([]);
  }

  const handleSelectChatPreference = (e) => {
    setMobilityPromptSelected(e.target.checked);
  };

  return (
    <>
      {isLoading ? <Loader /> : (
        <>
          <MobileNav />
          <div id="mm-0" className="mm-page mm-slideout">
            <div id='preloader' style={{ display: `${isLoaded ? 'none' : ''}` }}></div>

            <div id='page'>
              <Header />
              <div className="sub-header">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-sm-12"></div>
                  </div>
                </div>
              </div>

              <main style={{ transform: 'none' }}>
                <div className="item-list-summary" style={{ transform: 'none' }}>
                  <div className="container" style={{ transform: 'none' }}>
                    <div className="row" style={{ transform: 'none' }}>
                      <div className='col-lg-3' id='mainContent' style={{ position: 'relative', overflow: 'visible', boxSizing: 'border-box', minHeight: '1px' }}>
                        <ChatPreference mobilityChecked={handleSelectChatPreference} />
                      </div>
                      <div className='col-lg-9'>
                        <ChatBox handleClearChat={handleClearChat} handleSubmit={handleSubmit} chat={aiResponse}/>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </>
      )}

    </>
  );
};

export default Home;