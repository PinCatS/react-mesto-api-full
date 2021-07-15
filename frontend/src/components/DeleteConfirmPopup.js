import '../index.css';
import PopupWithForm from './PopupWithForm';

function DeleteConfirmPopup({isOpen, onClose, onDeleteConfirm, isLoading}) {

  const buttonText = isLoading ? 'Удаление' : 'Да'

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onDeleteConfirm();
    onClose();
  }

  return (
    <PopupWithForm
      name="remove-card"
      title="Вы уверены?"
      buttonText={buttonText}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}>
    </PopupWithForm>
  );
}

export default DeleteConfirmPopup;

