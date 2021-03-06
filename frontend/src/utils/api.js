class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //   GET https://around.nomoreparties.co/v1/groupId/cards
  getCardList(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error! ${res.statusText}`).catch((err) =>
            console.log(err)
          )
    );
  }
  //   GET https://around.nomoreparties.co/v1/groupId/users/me
  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error! ${res.statusText}`).catch((err) =>
            console.log(err)
          )
    );
  }

  //   POST https://around.nomoreparties.co/v1/groupId/cards
  addCard({ name, link }, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error! ${res.statusText}`).catch((err) =>
            console.log(err)
          )
    );
  }
  //   DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
  removeCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error! ${res.statusText}`).catch((err) =>
            console.log(err)
          )
    );
  }

  //   PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId

  changeLikeCardStatus(cardId, isLiked, token) {
    const methodName = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: methodName,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error! ${res.statusText}`).catch((err) =>
            console.log(err)
          )
    );
  }

  //   DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId

  //   PATCH https://around.nomoreparties.co/v1/groupId/users/me
  setUserInfo({ name, about }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error! ${res.statusText}`).catch((err) =>
            console.log(err)
          )
    );
  }
  //   PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  setUserAvatar( avatar, token ) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar:avatar
      }),
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error! ${res.statusText}`).catch((err) =>
            console.log(err)
          )
    );
  }
}

const api = new Api({
  baseUrl: "https://api.aroundtheusa.students.nomoreparties.site",
  // baseUrl: "http://localhost:3001",
  // headers: {
  //   Authorization: `Bearer ${token}`
  //   "Content-Type": "application/json",
  // },
});

export default api;
