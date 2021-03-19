import {makeAutoObservable, runInAction} from "mobx";
import {api} from "../api";
import {saveTokenToStorage, saveAuthToStorage, clearAuthFromStorage} from "../libs/localStorage";

export interface IAuthStore {
    login: string;
    password: string;
    isAuth: boolean;
    setLogin: Function;
    setPassword: Function;
    loginRequest: Function;
    authRequest: Function;
}

export const authStore = makeAutoObservable({
    login: '',
    password: '',
    isAuth: null,
    setLogin(login: string): void {
        runInAction(() => authStore.login = login)
    },
    setPassword(password: string): void {
        runInAction(() => authStore.password = password)
    },
    async loginRequest() {
        const result = await api.login(authStore.login, authStore.password);
        if (result.token) {
            saveTokenToStorage(result.token);
            saveAuthToStorage(true)
            runInAction(() => authStore.isAuth = true);
        }
    },
    async authRequest() {
        const isAuth = await api.userCheckAuth();
        if (isAuth.result) {
            saveAuthToStorage(true)
            runInAction(() => authStore.isAuth = true)
        } else {
            clearAuthFromStorage()
            runInAction(() => authStore.isAuth = false)
        }
    }
});