export default {
    saveTokenToStorage(token: string) {
        localStorage.setItem('token', token);
    },
    clearTokenFromStorage() {
        localStorage.removeItem('token');
    },
    getTokenFromStorage(): Object {
        if (!localStorage.token) return null;
        return localStorage.token;
    }

}

