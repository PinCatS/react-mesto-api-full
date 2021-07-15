import { useEffect, useRef, useState } from 'react';
import '../index.css';

function PopupWithForm({title, name, isOpen, onClose, onSubmit, isLoading, buttonText, children, ...props}) {
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    setIsFormValid(formRef.current.checkValidity())
  },[isOpen, onClose, children]);

  return (
    <div className={`popup popup_name_${name} ${isOpen && 'popup_opened'}`}  >
      <form ref={formRef}
            className="popup__container popup__form"
            name={`${name}-form`}
            onSubmit={onSubmit}
            noValidate>
        <button
          type="button"
          aria-label="Закрыть форму"
          className="button popup__close-button"
          onClick={onClose}></button>
        <h2 className="popup__heading">{title}</h2>
        <fieldset className="popup__info">
          {children}
          <button type="submit"
                className={`button popup__save-button ${!isFormValid && 'popup__save-button_disabled'}`}
                disabled={!isFormValid}>{isLoading ? buttonText + '...' : buttonText}</button>
        </fieldset>
      </form>
    </div>
  );
}

export default PopupWithForm;