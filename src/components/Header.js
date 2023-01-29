import pageLogo from '../images/header-logo.svg';

function Header() {
    return (<header className="header">
        <img src={pageLogo} alt="Логотип заголовка" className="header__logo" />
    </header>)
}

export default Header;