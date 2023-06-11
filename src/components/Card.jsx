import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { cardOptions } from '../utils/constants';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.find(user => user._id === currentUser._id);

  return (
    <li className="photo-item">
      {isOwn && (
        <button
          className="button photo-item__button-delete"
          type="button"
          aria-label="Удалить"
          data-action="DELETE"
          onClick={() => onCardDelete(card)}
        ></button>
      )}

      <img
        className="photo-item__img"
        src={card.link}
        alt="Описание фото"
        data-action="PREVIEW"
        onClick={() => onCardClick(card)}
      />
      <div className="photo-item__info">
        <h2 className="photo-item__description">{card.name}</h2>

        <div className="photo-item__like-stats">
          <button
            className={`button photo-item__button-like ${
              isLiked && cardOptions.buttonLikeActiveClass
            }`}
            type="button"
            data-action="LIKE"
            onClick={() => onCardLike(card)}
          ></button>
          <div className="photo-item__like-count">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}
export { Card };
