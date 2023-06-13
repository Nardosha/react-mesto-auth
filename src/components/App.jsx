import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { AppContext } from "../contexts/AppContext";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Register } from "./Register";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "./Login";
import { InfoTooltip } from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [authUser, setAuthUser] = useState({
    email: "",
    password: "",
  });

  const [currentUser, setCurrentUser] = useState({
    name: "",
    description: "",
    avatar: "",
    _id: null,
  });

  const successText = "Вы успешно зарегистрировались!";
  const errorText = "Что-то пошло не так! Попробуйте ещё раз.";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
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
    setIsInfoPopupOpen(false);
    setSelectedCard(null);
  };

  const _handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleRequest = (request) => {
    setIsLoading(true);

    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const _handleUpdateUser = ({ name, description }) => {
    const submitEditUserProfile = () => {
      return api.editUserInfo({ name, about: description }).then((res) => {
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
      return api.editUserAvatar({ avatar }).then((user) => {
        setCurrentUser({ ...currentUser, avatar: user.avatar });
      });
    };

    handleRequest(submitEditUserAvatar);
  };

  const _handleAddPlaceSubmit = (card) => {
    const submitAddPlace = () => {
      return api.createCard(card).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    };

    handleRequest(submitAddPlace);
  };

  const _handleCardLike = (card) => {
    const isLiked = card.likes.find((user) => user._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((card) => (card._id === newCard._id ? newCard : card))
        );
      })
      .catch(console.error);
  };

  const _handleDeleteCard = (deletedCard) => {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((card) => card._id !== deletedCard._id)
        );
      })
      .catch(console.error);
  };

  const onRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (!res?.data) {
          throw Error(res);
        }

        setIsLoggedIn(true);
        setAuthUser({ email: res.data.email, password: password });
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log("onRegister ERROR", err);
        setIsInfoPopupOpen(true);
      });
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    if (!userData) return;
    setAuthUser({ email: userData.email, password: userData.password });
    setIsInfoPopupOpen(true);
  };

  const checkToken = () => {
    const token = localStorage.getItem("jwt");
    return auth
      .checkToken(token)
      .then((res) => {
        console.log(token, res);
        setIsLoggedIn(true);
        navigate("/me", { replace: true });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/", { replace: true });
  };

  const loadData = () => {
    console.log("loadData");
    Promise.all([api.loadUserInfo(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        console.log("loadData then");
        setCurrentUser({
          name: userInfo.name,
          description: userInfo.about,
          avatar: userInfo.avatar,
          _id: userInfo._id,
        });
        setCards([...cards]);
      })
      .catch(console.error);
  };

  useEffect(() => {
    checkToken()
      .then(() => {
        loadData();
      })
      .catch(console.error);

    return () => {
      setIsLoggedIn(false);
    };
  }, []);

  return (
    <div className="root">
      <AppContext.Provider
        value={{ isLoggedIn, isLoading, handleLogin, closeAllPopups }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <div className="wrapper">
            <Header />

            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <Navigate to="/me" replace />
                  ) : (
                    <Navigate to="/sign-in" replace />
                  )
                }
              />

              <Route
                path="/sign-up"
                element={<Register onRegister={onRegister} />}
              />
              <Route path="/sign-in" element={<Login />} />

              <Route
                path="/me"
                element={
                  <ProtectedRoute
                    element={Main}
                    cards={cards}
                    onEditProfile={_handleEditProfileClick}
                    onAddPlace={_handleAddPlaceClick}
                    onEditAvatar={_handleEditAvatarClick}
                    onCardClick={_handleCardClick}
                    onCardLike={_handleCardLike}
                    onCardDelete={_handleDeleteCard}
                  />
                }
              />
            </Routes>

            {isLoggedIn && <Footer />}
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

          <InfoTooltip
            type={isLoggedIn ? "success" : "error"}
            isOpen={isInfoPopupOpen}
          />
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
