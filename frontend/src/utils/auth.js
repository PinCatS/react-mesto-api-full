class Auth {
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
  
    signin(email, password) {
      return fetch(`${this._url}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({email, password})
      })
      .then(this._onResponse);
    }
  
    signup(email, password) {
      return fetch(`${this._url}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({email, password})
      })
      .then(this._onResponse)
    }

    getContent(jwt) {
      return fetch(`${this._url}/users/me`, {
        headers: { 
          ...this._headers,
          'Authorization': `Bearer ${jwt}`
        }
      })
      .then(this._onResponse)
    }
}

/* Create and export Auth */
export default new Auth('https://api.mesto-praktikum.nomoredomains.monster', {
    'content-type': 'application/json'
});