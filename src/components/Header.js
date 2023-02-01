import pageLogo from '../images/header-logo.svg';
import { Link } from 'react-router-dom'

function Header(props) {
    return (<header className="header">
        <img src={pageLogo} alt="Логотип заголовка" className="header__logo" />
        <div className='header__user-menu'>
            {props.loggedIn && <p className='header__email'>{props.email}</p>}
            <Link to={props.link} className='header__link'>{props.linkName}</Link>
        </div>
    </header>)
}

export default Header;