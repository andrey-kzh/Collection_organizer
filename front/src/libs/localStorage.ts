export function saveTokenToStorage(token: string) {
    localStorage.setItem('token', token);
}

export function clearTokenFromStorage() {
    localStorage.removeItem('token');
}

export function getTokenFromStorage() {
    if (!localStorage.token) return null;
    return localStorage.token;
}

export function saveAuthToStorage(isAuth: boolean) {
    localStorage.setItem('isAuth', JSON.stringify(isAuth));
}

export function getAuthFromStorage() {
    if (!localStorage.isAuth) return null;
    return JSON.parse(localStorage.isAuth);
}

export function clearAuthFromStorage() {
    localStorage.removeItem('isAuth');
}