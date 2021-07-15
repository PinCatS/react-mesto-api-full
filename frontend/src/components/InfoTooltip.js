import '../index.css';

function InfoTooltip({isOpen, onClose, message, imageSrc}) {
    return (
      <div className={`popup popup_name_info ${isOpen && 'popup_opened'}`}  >
        <div  className="popup__container popup__form">
          <button
            type="button"
            aria-label="Закрыть форму"
            className="button popup__close-button popup__close-button_location_topcenter"
            onClick={onClose}></button>
          <div className="popup__info">
            <img className="popup__info-image" src={imageSrc} alt="Успех"/>
            <h2 className="popup__info-text">{message}</h2>
          </div>
        </div>
      </div>
    );
}

export default InfoTooltip;