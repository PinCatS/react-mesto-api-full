import '../index.css';
import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const user = useContext(CurrentUserContext);
    const isOwn = card.owner._id === user._id;
    const cardDeleteButtonClassName = (
        `button card__remove-button ${isOwn ? 'card__remove-button_visible' : ''}`
    );
    const isLiked = card.likes.some(like => like._id === user._id);
    const cardLikeButtonClassName = (
        `button card__like-button ${isLiked ? 'card__like-button_active' : ''}`
    );

    const handleCardClick = () => onCardClick(card);
    const handleCardLike = () => onCardLike(card);
    const handleCardDelete = () => onCardDelete(card);

    return (
        <li className="card">
            <button type="button"
                    aria-label="Удалить карточку"
                    className={cardDeleteButtonClassName}
                    onClick={handleCardDelete}></button>
            <img
                className="card__image"
                src={card.link}
                alt="Камчатка"
                onClick={handleCardClick} />
            <div className="card__info">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like">
                    <button type="button"
                            aria-label="Нравится"
                            className={cardLikeButtonClassName}
                            onClick={handleCardLike}></button>
                    <p className="card__like-counter">{card?.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;