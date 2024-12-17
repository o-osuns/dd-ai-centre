import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import ChatBox from '../components/ChatBox';
import ChatPreference from '../components/ChatPreference';
import Loader from '../components/loader/Loader';
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { Ollama } from "@langchain/ollama";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobilityPromptSelected, setMobilityPromptSelected] = useState(false);
  const [aiResponse, setAiResponse] = useState({ botMessage: '' });
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async () => {
    setIsLoading(false);
    setAiResponse({ botMessage: '' });
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value;
    // Create a chat history to store messages
    const mainChatMessageHistory = new ChatMessageHistory();

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

    setUserMessage(message);

    try {
      const ollamaModel = await new Ollama({ model: 'llama3:latest', stream: true, baseUrl: 'http://197.156.243.44:11434' });
      await mainChatMessageHistory.addMessage(new HumanMessage(prompt));
      const stream = new ReadableStream({
        async start(controller) {
          let fullResponse = '';
          let buffer = '';
          let lastWord = '';

          // Process the AI's response in chunks
          for await (const chunk of await ollamaModel.stream(prompt)) {
            fullResponse += chunk;
            buffer += chunk;
            // Split the buffer into words
            console.log(chunk);
            const words = buffer.split(/\s+/);

            // If we have 15 or more words, send them to the client
            if (words.length >= 15) {
              const completeWords = words.slice(0, -1).join(" ");              
              // Keep the last word in the buffer

              buffer = words[words.length - 1];
              lastWord = completeWords.split(/\s+/).pop();
              // Add the AI's response to the chat history              
            }

            if (buffer) {
              controller.enqueue(
              new TextEncoder().encode(
                JSON.stringify({
                text: buffer,
                lastWord: lastWord,
                isLast: true,
                })
              )
              );
            }

            // Add the AI's full response to the chat history
            await mainChatMessageHistory.addMessage(
              new AIMessage(fullResponse)
            );

            const prevAIResponse = aiResponse;
            setAiResponse(prevResponse => ({ ...prevResponse, botMessage: fullResponse }));
          }
          controller.close();
        }
      });

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
                        <ChatBox handleClearChat={handleClearChat} handleSubmit={handleSubmit} userMessage={userMessage} chat={aiResponse}/>
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