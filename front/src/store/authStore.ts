import {makeAutoObservable, runInAction} from "mobx";
import {api} from "../api";
import tokensStorage from "../libs/localStorage";

export interface IAuthStore {
    login: string;
    password: string;
    errorLogin: string;
    isAuth: boolean;
    setLogin: (login: string) => void;
    setPassword: (password: string) => void;
    loginRequest: () => void;
    logoutRequest: () => void;
    authRequest: () => void;
}

export const authStore = makeAutoObservable({
    login: '',
    password: '',
    errorLogin: '',
    isAuth: null,
    setLogin(login: string) {
        runInAction(() => authStore.login = login)
    },

    setPassword(password: string) {
        runInAction(() => authStore.password = password)
    },

    async loginRequest() {
        const res = await api.login(authStore.login, authStore.password);
        if (!(res instanceof Error)) {
            if (res.status !== 200) {
                runInAction(() => authStore.errorLogin = res.data.error.message)
            }
            if (res.data.token) {
                tokensStorage.saveTokenToStorage(res.data.token);
                runInAction(() => authStore.isAuth = true);
            } else tokensStorage.clearTokenFromStorage()
        }
    },

    async logoutRequest() {
        const res = await api.logout();
        if (!(res instanceof Error)) {
            if (res.data.isLogout) {
                tokensStorage.clearTokenFromStorage()
                runInAction(() => authStore.isAuth = false)
            }
        }
    },

    async authRequest() {
        const res = await api.userCheckAuth();
        if (!(res instanceof Error) && res !== false) {
            if (res.data.isAuth) {
                runInAction(() => authStore.isAuth = true)
            } else {
                tokensStorage.clearTokenFromStorage()
                runInAction(() => authStore.isAuth = false)
            }
        }
    }
});