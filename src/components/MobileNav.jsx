
const MobileNav = () => {
    const currentYear = new Date().getFullYear();

    return (
        <nav id="mm-menu" className="main-menu mm-menu mm-offcanvas mm-hasnavbar-bottom-1 mm-pagedim-black mm-theme-dark" aria-hidden="true">
            <div className="mm-panels">
                <div className="mm-panel mm-hasnavbar mm-opened" id="mm-1">
                    <div className="mm-navbar">
                        <a className="mm-title">MENU</a>
                    </div>
                    <ul className="mm-listview">
                        <li>
                            <span>
                                <a href="login.php">Log in as Admin</a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mm-navbars-bottom">
                <div className="mm-navbar mm-navbar-size-1">
                    <a href="#">© {currentYear} DD AI Center</a>
                </div>
            </div>
        </nav>
    );
};

export default MobileNav;