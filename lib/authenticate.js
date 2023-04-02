import jwt_decode from 'jwt-decode'

export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ login: user, password: password }),
    headers: {
      'content-type': 'application/json',
    },
  });

  const data = await res.json();

  if (data.status) {
    setToken(data.result.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}

export async function registerUser(user, password, password2) {
  if(password !== password2) {
    throw new Error('Passwords are not equal.');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registration`, {
    method: 'POST',
    body: JSON.stringify({ login: user, password: password }),
    headers: {
      'content-type': 'application/json',
    },
  });

  const data = await res.json();

  if (res.status === 200 && data.status === true) {
    return true;
  } else {
    throw new Error(data.message);
  }
}

function setToken(token) {
  localStorage.setItem('access_token', token);
}

export function getToken() {
  try {
    return localStorage.getItem('access_token');
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem('access_token');
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwt_decode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}