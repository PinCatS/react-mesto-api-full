import '../index.css';
import {useState} from 'react';
import {NavLink} from 'react-router-dom';

function SignForm({title, buttonName, showedFooter, onSubmit}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (evt) => {
      const value = evt.target.value;
      setEmail(value);
    };

    const handlePasswordChange = (evt) => {
      const value = evt.target.value;
      setPassword(value);
    };

    const handleSubmit = (evt) => {
      evt.preventDefault();
      onSubmit({
        email,
        password
      });
    }

    return (
      <div className='login'>
        <form
              className="login__form"
              name='login-form'
              onSubmit={handleSubmit}
              noValidate>
          <h2 className="login__heading">{title}</h2>
          <fieldset className="login__info">
            <div className="login__container">
              <input
                  type="email"
                  className="form-input login__input login__input_name_email"
                  value={email}
                  onChange={handleEmailChange}
                  name="email"
                  placeholder="Email"
                  required />
              <span
                className='login__input-error login__input-error_name_email'>
              </span>
              <input
                  type="password"
                  className="form-input login__input login__input_name_password"
                  value={password}
                  onChange={handlePasswordChange}
                  name="password"
                  placeholder="Пароль"
                  required />
              <span
                className='login__input-error login__input-error_name_password'>
              </span>
            </div>
            <button type="submit"
                  className='button login__save-button'>{buttonName}</button>
          </fieldset>
        </form>
        <footer className={`login__footer ${showedFooter && 'login__footer_visible'}`}>
          <NavLink to="/sign-in" activeClassName="login__footer-link_active" className="login__footer-link">Уже зарегистрированы? Войти</NavLink>
        </footer>
      </div>
    );
}

export default SignForm;