class Api {
    constructor(url, headers) {
      this._url = url;
      this._headers = headers;
    }
  
    _onResponse(res) {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject({
        status: res.status,
        statusText: res.statusText
      });
    }
  
    getCards() {
      return fetch(`${this._url}cards`, {
        headers: this._headers
      })
      .then(this._onResponse);
    }
  
    getUserInfo() {
      return fetch(`${this._url}users/me`, {
        headers: this._headers
      })
      .then(this._onResponse)
    }
  
    updateAvatar(link) {
      return fetch(`${this._url}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({avatar: link})
      })
      .then(this._onResponse);
    }
  
    setProfile(name, about) {
      return fetch(`${this._url}users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({name, about})
      })
      .then(this._onResponse);
    }
  
    addCard(name, link) {
      return fetch(`${this._url}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({name, link})
      })
      .then(this._onResponse);
    }
  
    deleteCard(cardId) {
      return fetch(`${this._url}cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._onResponse);
    }
  
    setLike(cardId) {
      return fetch(`${this._url}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._onResponse);
    }
  
    removeLike(cardId) {
      return fetch(`${this._url}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._onResponse);
    }

    changeLikeCardStatus(cardId, isLiked) {
      if (isLiked) {
        return this.removeLike(cardId);
      } else {
        return this.setLike(cardId);
      }
    }
}

/* Create and export API */
export default new Api('https://mesto.nomoreparties.co/v1/cohort-20/', {
    authorization: '9a69937c-ba0b-400f-a7bf-af3d18fbfaea',
    'content-type': 'application/json'
});
  