import '../index.css';
import {useHistory} from 'react-router-dom';
import Auth from '../utils/auth';
import Header from './Header';
import SignForm from '../components/SignForm';

function Register({onSuccess, onFailure}) {
  const history = useHistory();

  const handleSubmit = ({email, password}) => {
    Auth.signup(email, password)
        .then(res => {
          history.push('/sign-in');
          onSuccess();
        })
        .catch(({status, statusText}) => {
          console.error('Failed to register.', status, statusText);
          onFailure();
        });
  }
  
  return (
    <>
      <Header navPath={'/sign-in'} linkText='Войти'/>
      <SignForm
        title="Регистрация"
        buttonName="Зарегистрироваться"
        showedFooter={true}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default Register;