import '../index.css';
import Auth from '../utils/auth';
import Header from './Header';
import SignFrom from '../components/SignForm';

function Login({onSuccess, onFailure}) {
  const handleSubmit = ({email, password}) => {
    Auth.signin(email, password)
        .then(res => {
          if (res.token) {
            localStorage.setItem('jwt', res.token);
            onSuccess(res.token);
          } else {
            console.error('No token in response during signin.');
            onFailure();
          }
        })
        .catch(({status, statusText}) => {
          console.error('Failed to signin.', status, statusText);
          onFailure();
        });
  }

  return (
    <>
      <Header navPath={'/sign-up'} linkText='Регистрация'/>
      <SignFrom
        title="Вход"
        buttonName="Войти"
        showedFooter={false}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default Login;