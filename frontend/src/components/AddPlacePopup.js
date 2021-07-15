import { useState } from 'react';
import '../index.css';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onCardAdd, isLoading}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [nameInputErrMessage, setNameInputErrMessage] = useState(null);
    const [urlInputErrMessage, setUrlInputErrMessage] = useState(null);


    const handleNameChange = (evt) => {
      const value = evt.target.value;
      setName(value);

      if (!value) {
        setNameInputErrMessage('Обзазательное поле.');
      } else if (value.length < 2 || value.length > 30) {
        setNameInputErrMessage('Поле должно содержать минимум 2 символа и максимум 30.');
      } else {
        setNameInputErrMessage(null);
      }
    };

    const handleLinkChange = (evt) => {
      const value = evt.target.value;
      setLink(value);

      if (!value) {
        setUrlInputErrMessage('Обзазательное поле.');
      } else if (!/^(https?:\/\/)/.test(value)) {
        setUrlInputErrMessage('Не верный формат ссылки.');
      } else {
        setUrlInputErrMessage(null);
      }
    };
    const resetInputs = () => {
      setName('');
      setLink('');
      setNameInputErrMessage(null);
      setUrlInputErrMessage(null);
    }

    const handleSubmit = (evt) => {
      evt.preventDefault();
      onCardAdd({
        name,
        link
      });
      resetInputs();
    }

    const handleClose = () => {
      resetInputs();
      onClose();
    }

    return (
      <PopupWithForm
          name="add-card"
          title="Новое место"
          isOpen={isOpen}
          isLoading={isLoading}
          buttonText="Создать"
          onClose={handleClose}
          onSubmit={handleSubmit}>
          <input
              type="text"
              className="form-input popup__input popup__input_name_place-name"
              name="place-name"
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameChange}
              placeholder="Название"
              minLength="2" maxLength="30"
              required />
          <span
            className={`popup__input-error popup__input-error_name_place-name ${nameInputErrMessage && 'popup__input-error_active'}`}>
            {nameInputErrMessage}
          </span>
          <input
              type="url"
              className="form-input popup__input popup__input_name_place-image-url"
              name="place-image-url"
              value={link}
              onChange={handleLinkChange}
              onBlur={handleLinkChange}
              placeholder="Ссылка на картинку"
              required />
          <span
            className={`popup__input-error popup__input-error_name_place-image-url ${urlInputErrMessage && 'popup__input-error_active'}`}>
            {urlInputErrMessage}
          </span>
      </PopupWithForm>
    );
}

export default AddPlacePopup;