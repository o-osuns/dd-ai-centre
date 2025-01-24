import React from 'react';
import '../assets/css/chat-container.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';

const ChatContainer = () => {
    const {messages} = useSelector((state) => state.messages);

    return (
        <div className="chat-list">
            {
                messages.map((message, index) => {
                    if (message.role === 'assistant') {
                        return (
                            <React.Fragment key={index}>
                                <div className="chat-message ai-message">
                                    <div style={{ display: 'flex' }}>
                                        <span className="icon" style={{ flex: '0.1' }}>
                                            <i className="fas fa-robot" style={{ color: '#71bf44' }}></i>
                                        </span>
                                        <div className='typing-effect'>
                                            <ReactMarkdown>
                                                {message.content}                                                
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </React.Fragment>
                        )
                    
                    } else {
                        return (
                            <React.Fragment key={index}>
                                <div key={index} className="chat-message human-message">{message.content}</div>
                            </React.Fragment>
                        )
                    }
                })
            }
            <div style={{marginTop: "150px"}}></div>
        </div>
    )
};

export default ChatContainer;