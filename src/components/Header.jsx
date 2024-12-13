import logo from '../assets/images/logo_trans.png';

const Header = () => {

    return (
        <header className="main-header sticky">
            <a href="#menu" className="btn-mobile">
                <div className="hamburger hamburger--spin" id="hamburger">
                    <div className="hamburger-box">
                        <div className="hamburger-inner"></div>
                    </div>
                </div>
            </a>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <div id="logo">
                            <h1>
                                <a href="#" title="Esty" style={{ background: `url(${logo}) no-repeat` }}>DD AI Center</a>
                            </h1>
                        </div>
                    </div>
                    <div className="col-lg-9 col-6">
                        <nav id="menu" className="main-menu">
                            <ul>
                                <li>
                                    <span>
                                        <a href="#">Log in as Admin</a>
                                    </span>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;