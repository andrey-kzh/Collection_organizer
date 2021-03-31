import {makeAutoObservable, runInAction} from "mobx";
import {api} from "../api";
import {saveTokenToStorage, clearTokenFromStorage} from "../libs/localStorage";

export interface IAuthStore {
    login: string;
    password: string;
    errorLogin: string;
    isAuth: boolean;
    setLogin: Function;
    setPassword: Function;
    loginRequest: Function;
    logoutRequest: Function;
    authRequest: Function;
}

export const authStore = makeAutoObservable({
    login: '',
    password: '',
    errorLogin: '',
    isAuth: null,
    setLogin(login: string): void {
        runInAction(() => authStore.login = login)
    },

    setPassword(password: string): void {
        runInAction(() => authStore.password = password)
    },

    async loginRequest() {
        const res = await api.login(authStore.login, authStore.password);
        if (res.status !== 200) {
            runInAction(() => authStore.errorLogin = res.data.error.message)
        }
        if (res.data.token) {
            saveTokenToStorage(res.data.token);
            runInAction(() => authStore.isAuth = true);
        } else clearTokenFromStorage()
    },

    async logoutRequest() {
        const res = await api.logout();
        if (res.data.isLogout) {
            clearTokenFromStorage()
            runInAction(() => authStore.isAuth = false)
        }
    },

    async authRequest() {
        const res = await api.userCheckAuth();
        if (res.data.isAuth) {
            runInAction(() => authStore.isAuth = true)
        } else {
            clearTokenFromStorage()
            runInAction(() => authStore.isAuth = false)
        }
    }
});