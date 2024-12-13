import '../assets/css/prompt.css';

const ChatBox = ({ handleClearChat, handleSubmit }) => {
    return (
        <div class="filter-box filters" style={{ border: '2px solid #36313D', display: 'flex', flexDirection: 'column', height: '80vh' }}>
            <div class="filter-box-header">
                <h3>Ask DD AI</h3>
                <span class="filter-box-link isotope-reset" onClick={handleClearChat}>Clear Search</span>
            </div>
            <div class="chat-body" id="chatBody">
            </div>
            <div class="chat-input">
                <textarea id="chatInput" class="form-control" placeholder="Type your message here..." autocomplete="off" style={{ border: '2px solid #36313D', height: '150px', color: 'white' }}></textarea>
                <button id="sendButton" class="btn mt-3" style={{ float: 'right', background: '#71bf44' }} onClick={handleSubmit}>
                    <i class="fa fa-location-arrow" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
};

export default ChatBox;