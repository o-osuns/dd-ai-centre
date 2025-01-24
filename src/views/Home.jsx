import { useEffect } from "react";
import ChatContainer from '../components/ChatContainer';
import Header from '../components/Header';
import TypingArea from '../components/TypingArea';
import { useSelector } from 'react-redux';

const Home = () => {
    const messages = useSelector((state) => state.messages.messages);

    useEffect(() => {
        const theme = sessionStorage.getItem('theme');
        const body = document.body;   
        if (theme === 'light_mode') {
            body.classList.remove('dark_mode');
            body.classList.add('light_mode');
        } else {
            body.classList.remove('light_mode');
            body.classList.add('dark_mode');
        }
    }, []);

    return (
        <>
            {
                messages.length === 0 ? (<Header />) : <></>
            }
            {/* Chat container */}
            <ChatContainer />
            {/* Typing Area */}
            <TypingArea />
        </>
    );
};

export default Home;