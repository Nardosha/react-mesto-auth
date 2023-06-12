import React from "react";

export const InfoTooltip = (props) => {
  const { type, text, submitButtonText, isOpen, onClose, onSubmit } = props;

  const successText = "Вы успешно зарегистрировались!";
  const errorText = "Что-то пошло не так! Попробуйте ещё раз.";

  return (
    <dialog className="popup popup_type_info">
      <div className="popup__container">
        <button
          className="icon-button popup__button-close"
          type="button"
          data-action="CLOSE"
          aria-label="Закрыть"
          onClick={onClose}
        />

        <p className={`popup__info popup__info_type_${type}`}>{text}</p>
      </div>
    </dialog>
  );
};
