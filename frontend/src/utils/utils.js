export const formConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    errorInputElementNamePrefix: '.popup__input-error_name_'
}
  
export const profileInfoEditButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const updateAvatarButton = document.querySelector('.profile__avatar-button');

export function onRequestError(apiErr, msg) {
    const apiErrorMsg = apiErr
            ? `${apiErr.status} ${apiErr.statusText}`
            : null;
    console.error(msg, apiErrorMsg);
}