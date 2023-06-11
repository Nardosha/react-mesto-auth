import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { PopupWithForm } from './PopupWithForm';
import { ImagePopup } from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { AppContext } from '../contexts/AppContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    description: '',
    avatar: '',
    _id: null,
  });

  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const _handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const _handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const _handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
  };

  const _handleCardClick = card => {
    setSelectedCard(card);
  };

  const handleRequest = request => {
    setIsLoading(true);

    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const _handleUpdateUser = ({ name, description }) => {
    const submitEditUserProfile = () => {
      return api.editUserInfo({ name, about: description }).then(res => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          description: res.about,
        });
      });
    };

    handleRequest(submitEditUserProfile);
  };

  const _handleUpdateAvatar = ({ avatar }) => {
    const submitEditUserAvatar = () => {
      return api.editUserAvatar({ avatar }).then(user => {
        setCurrentUser({ ...currentUser, avatar: user.avatar });
      });
    };

    handleRequest(submitEditUserAvatar);
  };

  const _handleAddPlaceSubmit = card => {
    const submitAddPlace = () => {
      return api.createCard(card).then(newCard => {
        setCards([newCard, ...cards]);
      });
    };

    handleRequest(submitAddPlace);
  };

  const _handleCardLike = card => {
    const isLiked = card.likes.find(user => user._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state =>
          state.map(card => (card._id === newCard._id ? newCard : card)),
        );
      })
      .catch(console.error);
  };

  const _handleDeleteCard = deletedCard => {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards(state => state.filter(card => card._id !== deletedCard._id));
      })
      .catch(console.error);
  };

  useEffect(() => {
    Promise.all([api.loadUserInfo(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser({
          name: userInfo.name,
          description: userInfo.about,
          avatar: userInfo.avatar,
          _id: userInfo._id,
        });
        setCards([...cards]);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="root">
      <AppContext.Provider value={{ isLoading, closeAllPopups }}>
        <CurrentUserContext.Provider value={currentUser}>
          <div className="wrapper">
            <Header />

            <Main
              cards={cards}
              onEditProfile={_handleEditProfileClick}
              onAddPlace={_handleAddPlaceClick}
              onEditAvatar={_handleEditAvatarClick}
              onCardClick={_handleCardClick}
              onCardLike={_handleCardLike}
              onCardDelete={_handleDeleteCard}
            />

            <Footer />
          </div>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={_handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={_handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={_handleUpdateAvatar}
          />

          <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            isOpen={isConfirmPopupOpen}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
