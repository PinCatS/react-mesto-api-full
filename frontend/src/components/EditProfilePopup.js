import '../index.css';
import {useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const user = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameInputErrMessage, setNameInputErrMessage] = useState(null);
  const [descriptionInputErrMessage, setDescriptionInputErrMessage] = useState(null);

  useEffect(() => {
    setName(user?.name ?? '');
    setDescription(user?.about ?? '');
  }, [user]); 

  const handleNameChange = (evt) => {
    const value = evt.target.value;
    setName(value);

    if (!value) {
      setNameInputErrMessage('Обзазательное поле.');
    } else if (value.length < 2 || value.length > 40) {
      setNameInputErrMessage('Поле должно содержать минимум 2 символа и максимум 40.');
    } else {
      setNameInputErrMessage(null);
    }
  };

  const handleDescriptionChange = (evt) => {
    const value = evt.target.value;
    setDescription(value);

    if (!value) {
      setDescriptionInputErrMessage('Обзазательное поле.');
    } else if (value.length < 2 || value.length > 200) {
      setDescriptionInputErrMessage('Поле должно содержать минимум 2 символа и максимум 200.');
    } else {
      setDescriptionInputErrMessage(null);
    }
  };

  const resetInputs = () => {
    setName(user?.name ?? '');
    setDescription(user?.about ?? '');
    setNameInputErrMessage(null);
    setDescriptionInputErrMessage(null);
  }

  const handleClose = () => {
    resetInputs();
    onClose();
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
  
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={handleClose}
      onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input popup__input popup__input_name_name"
          name="profile-name"
          value={name}
          onChange={handleNameChange}
          placeholder="Имя профиля"
          minLength="2" maxLength="40"
          required /> 
        <span
          className={`popup__input-error popup__input-error_name_profile-name ${nameInputErrMessage && 'popup__input-error_active'}`}>
          {nameInputErrMessage}
        </span>
        <input
          type="text"
          className="form-input popup__input popup__input_name_activity"
          name="profile-activity"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Деятельность"
          minLength="2" maxLength="200"
          required />
        <span
          className={`popup__input-error popup__input-error_name_profile-activity ${descriptionInputErrMessage && 'popup__input-error_active'}`}>
          {descriptionInputErrMessage}
        </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;