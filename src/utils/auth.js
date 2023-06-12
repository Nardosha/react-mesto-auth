const BASE_URL = "https://auth.nomoreparties.co";

export function register(email, password) {
  console.log(email, password);
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.message || res.status}`);
    })
    .catch(console.error);
}

export function signIn(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.message || res.status}`);
    })
    .catch(console.error);
}

export function checkToken(token) {
  return fetch(`${BASE_URL}//users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error ${res.message || res.status}`);
    })
    .catch(console.error);
}
