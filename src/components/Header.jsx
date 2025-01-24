const Header = () => {
    const text = "Hello, there, I am Daix";
    
    return (
        <header className="header">
            <h1>
            {text.split('').map((char, index) => (
                <span key={index} className="title animated-char" style={{ animationDelay: `${index * 0.1}s` }}>
                    {char}
                </span>
            ))}
            </h1>
            <p className="subtitle">How can I help you today?</p>
            <ul className="suggestion-list">
                <li className="suggestion">
                    <h4 className="text">Tell me about yourself.</h4>
                    <span className="icon material-symbols-rounded">draw</span>
                </li>
                <li className="suggestion">
                    <h4 className="text">Where is your office located?</h4>
                    <span className="icon material-symbols-rounded">lightbulb</span>
                </li>
                <li className="suggestion">
                    <h4 className="text">Can you please assist me with my network issues?</h4>
                    <span className="icon material-symbols-rounded">explore</span>
                </li>
                <li className="suggestion">
                    <h4 className="text">Who do you work for?</h4>
                    <span className="icon material-symbols-rounded">code</span>
                </li>
            </ul>
        </header>
    )
};

export default Header;