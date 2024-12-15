import '../assets/css/prompt.css';

const ChatBox = ({ handleClearChat, handleSubmit }) => {
    return (
        <div className="filter-box filters" style={{ border: '2px solid #36313D', display: 'flex', flexDirection: 'column', height: '80vh' }}>
            <div className="filter-box-header">
                <h3>Ask DD AI</h3>
                <span className="filter-box-link isotope-reset" onClick={handleClearChat}>Clear Search</span>
            </div>
            <div className="chat-body" id="chatBody">
            </div>
            <div className="chat-input">
                <textarea id="chatInput" className="form-control" placeholder="Type your message here..." autoComplete="off" style={{ border: '2px solid #36313D', height: '150px', color: 'white' }}></textarea>
                <button id="sendButton" className="btn mt-3" style={{ float: 'right', background: '#71bf44' }} onClick={handleSubmit}>
                    <i className="fa fa-location-arrow" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
};

export default ChatBox;