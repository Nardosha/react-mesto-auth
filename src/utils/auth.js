const BASE_URL = "https://auth.nomoreparties.co";

function register(password, email) {
  return fetch(`${register}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 400) {
        throw Error("Некорректно заполнено одно из полей.");
      }
      return res;
    })
    .then((res) => res)
    .catch(console.error);
}

function signIn(password, email) {
  return fetch(`${register}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 400) {
        throw Error("Не передано одно из полей.");
      }

      if (res.status === 401) {
        throw Error("Пользователь с тамим email не найден.");
      }
      return res;
    })
    .then((res) => res)
    .catch(console.error);
}

function checkToken(token) {
  return fetch(`${register}//users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 400) {
      throw Error("Токен не передан или передан не в том формате.");
    }

    if (res.status === 401) {
      throw Error("Переданный токен некорректен.");
    }
    return res;
  });
}
