import { useContext } from 'react';
import '../index.css';
import Header from './Header';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({cards,
                userEmail,
                onLogout,
                onEditProfile,
                onAddPlace,
                onEditAvatar,
                onCardClick,
                onCardLike,
                onCardDelete}) {
  const user = useContext(CurrentUserContext);

  return (
    <>
      <Header navPath={'/sign-in'}
              email={userEmail}
              linkText='Выйти'
              showMenu={true}
              isButtonTextGrey={true}
              onHeaderButtonClick={onLogout}
      />
      <main className="content page__content">
        <section className="profile">
          {user && (<div className="profile__info">
            <div className="profile__avatar-button" onClick={onEditAvatar}>
              <img className="profile__avatar" src={user.avatar} alt="Аватар профиля" />
            </div>
            <div className="profile__info-text">
              <h1 className="profile__name">{user.name}</h1>
              <p className="profile__activity">{user.about}</p>
              <button
                  type="button"
                  aria-label="Редактировать профиль"
                  name="profile-edit-button"
                  className="button profile__edit-button"
                  onClick={onEditProfile}></button>
            </div>
          </div>)}
          <button 
              type="button"
              aria-label="Добавить карточку"
              name="profile-add-button"
              className="button profile__add-button"
              onClick={onAddPlace}></button>
        </section>

        <section className="places page__places" aria-label="Карточки мест">
          <ul className="cards">
              { cards.map(card => (
                  <Card key={card._id}
                          card={card}
                          onCardClick={onCardClick}
                          onCardLike={onCardLike}
                          onCardDelete={onCardDelete}/>))
              }
          </ul>
        </section>
      </main>
    </>
  )
}

export default Main;