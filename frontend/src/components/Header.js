import '../index.css';
import {useState} from 'react';
import burgeIcon from '../images/burger-icon.svg';
import closeIcon from '../images/button-cross.svg';
import {useHistory} from 'react-router-dom';
import logoPath from '../images/logo.svg';

function Header({navPath, email, linkText, isButtonTextGrey, showMenu, onHeaderButtonClick}) {
    const [menuToggled, setMenuToggled] = useState(false);
    const history = useHistory();

    const handleClick = (evt) => {
      if (onHeaderButtonClick) onHeaderButtonClick();
      history.push(navPath);
    }

    const toggleMenu = () => {
      setMenuToggled(!menuToggled);
    }

    const classHeader = `header page__header ${(showMenu && menuToggled) ? 'header_type_grid' : 'header_type_flex'}`;
    const classHeaderMain = `header__main ${showMenu && 'header__main_type_bordered'} ${menuToggled && 'header__main_visible'} ${!showMenu && 'header__main_visible'}`;

    return (
        <header className={classHeader}>
          <img src={logoPath} alt="Лого Mesto" className="header__logo" />
          <div className={classHeaderMain}>
            {email && <span className="header__user-name">{email}</span>}
            <button className={`header__button ${isButtonTextGrey && 'header__button_color_grey'}`}
                    onClick={handleClick}
            >
                      {linkText}
            </button>
          </div>
          {showMenu && <button className="header__burger" onClick={toggleMenu}>
            {menuToggled
                ? <img src={closeIcon} alt="кнопка закрыть" className='header__close-button'/>
                : <img src={burgeIcon} alt="бургер-меню"/>}
          </button>}
        </header>
    );
}

export default Header;