import ChatLoader from "./loader/ChatLoader";
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setIsLoading } from '../states/messagesSlice';
import AgentService from "../services/AgentService";

const TypingArea = () => {
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state) => state.messages);
    const agentService = AgentService();

    const toggleTheme = () => {
        const body = document.body;       

        if (body.classList.contains('light_mode')) {
            body.classList.remove('light_mode');
            sessionStorage.setItem('theme', 'dark_mode');
            return;
        }

        body.classList.toggle('light_mode');
        body.classList.remove('dark_mode');
        sessionStorage.setItem('theme', 'light_mode');
    };

    const sendMessage = () => {
        dispatch(setIsLoading(true));
        const input = document.querySelector('.typing-input');
        if (input.value === '') return;

        agentService.getAgents(input.value)

        const data = { "role": "user", "content": input.value.trim() }
        input.value = '';
        dispatch(addMessage(data));
    };

    return (
        <div className="typing-area">
            {isLoading ? <ChatLoader /> : <></>}

            <div className="typing-form">
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter a prompt here" className="typing-input" required />
                    <button id="send-message-button" className="icon material-symbols-rounded" onClick={sendMessage}>send</button>
                </div>
                <div className="action-buttons">
                    <span id="theme-toggle-button" className="icon material-symbols-rounded" onClick={toggleTheme}>light_mode</span>
                    <span id="delete-chat-button" className="icon material-symbols-rounded">delete</span>
                </div>
            </div>
            <p className="disclaimer-text">
                Daix may display inaccurate info, including about people, so double-check its responses.
            </p>
        </div>
    )
};

export default TypingArea;