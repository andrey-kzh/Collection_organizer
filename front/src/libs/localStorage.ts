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