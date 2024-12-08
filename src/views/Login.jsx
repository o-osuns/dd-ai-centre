import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';
import overlay from '../assets/images/overlay.png';
import ai_eye from '../assets/images/ai-eye.png';

const Login = () => {
  const [loaded, setLoaded] = useState('');
  const [showAIChat, setShowAIChat] = useState(false);
  const [isSelectType, setIsSelectType] = useState({
    chat: { active: true, style: { width: '151.812px', left: '0px' } },
    image: { active: false, style: { width: '169.328px', left: '151.812px' } },
    video: { active: false, style: { width: '164.359px', left: '321.141px' } }
  });
  const [activeStyle, setActiveStyle] = useState({ width: '151.812px', left: '0px' });

  useEffect(() => {
    setLoaded('loaded');
  }, []);

  const handleSelectType = (type) => {
    let newActive = {
      chat: { active: false, style: { width: '151.812px', left: '0px' } },
      image: { active: false, style: { width: '169.328px', left: '151.812px' } },
      video: { active: false, style: { width: '164.359px', left: '321.141px' } }
    };

    newActive[type].active = true;
    setActiveStyle(newActive[type].style);
    setIsSelectType(newActive);
  };

  return (
    <>
      <div className={`loader ${loaded}`}>
        <h1 className="loaderText" data-original="aiana">loading</h1>
      </div>

      <div id="scroll-content">
        <div className="overflow-hidden">
          <header id="top">
            <nav className="d-flex align-items-center flex-wrap">
              <div className="logo">
                <img src={logo} alt="Logo" />
                DD AI Centre
              </div>
            </nav>

            {(showAIChat) ? <></> : (
              <section className="aiana-hero text-center">
                <div className="container position-relative z-2">
                  <div className="row align-items-center">
                    <div className="col-md-12 tab-100 position-relative z-3">
                      <h1 className="aiana-h1 text-center">Login</h1>
                      <p className="aiana-desc text-center">
                        Dimension Data Nigeria's AI Center Login Form
                      </p>
                      <div className="aiana-search position-relative z-3">
                        <div className="inputField" style={{ marginBottom: '20px' }}>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                          />
                        </div>

                        <div className="inputField">
                          <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                          />
                          <button>
                            <i className="fa-solid fa-eye" style={{ color: 'white' }}></i>
                          </button>
                        </div>

                        <button className="aiana-button" onClick={() => { setShowAIChat(true) }}>Login</button>
                      </div>
                    </div>
                  </div>
                </div>



                <div className="heroImg">
                  <img src={overlay} alt="overlay" />
                </div>
              </section>
            )}

            {showAIChat && (
              <section className="aiana-hero text-center">
                <div className="container position-relative z-2">
                  <div className="row align-items-center">
                    <div className="col-md-12 tab-100 position-relative z-3">
                      <h1 className="aiana-h1 text-center">DD AI Centre</h1>
                      <p className="aiana-desc text-center">
                        Let's make your workflow smoother!
                      </p>
                      <div className="aiana-search position-relative z-3">
                        <div className="searchType">
                          <div className={`type ${isSelectType.chat.active ? 'active' : ''}`} onClick={() => handleSelectType('chat')}>
                            <span className="aiana-h4 small opacity-100">chat</span>
                          </div>
                          <div className={`type ${isSelectType.image.active ? 'active' : ''}`} onClick={() => handleSelectType('image')}>
                            <span className="aiana-h4 small opacity-100">image</span>
                          </div>
                          <div className={`type ${isSelectType.video.active ? 'active' : ''}`} onClick={() => handleSelectType('video')}>
                            <span className="aiana-h4 small opacity-100">video</span>
                          </div>

                          <div className="activeType" style={activeStyle}></div>
                        </div>

                        <div className="inputField">
                          <input
                            type="text"
                            name="search"
                            placeholder="Describe What you want"
                          />
                          <button>
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div>
              <img src={ai_eye} alt="eye" class="hero-eye" />
            </div>

                <div className="heroImg">
                  <img src={overlay} alt="overlay" />
                </div>
              </section>
            )}

          </header>

          <div className="copyright position-relative z-3">
            <div className="container h-100 d-flex align-items-center justify-content-between">
              Copyright {new Date().getFullYear()} @DD AI Centre
              <div className="paymentImgs"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;