import './loading-dots.css'

const ChatLoader = () => {
    return (
        <div className="chat-loader">
            <span className="loading-dots">
                <span className="dot-1"></span>
                <span className="dot-2"></span>
                <span className="dot-3"></span>
            </span>
        </div>
    )
};

export default ChatLoader;