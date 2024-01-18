/* eslint-disable no-unused-vars */
export const login = (token, userData) => {
    localStorage.setItem('auth', true);
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(userData));
}

export const logout = () => {
    localStorage.clear();
}