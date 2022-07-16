import { authStore } from "./authStore";
import { api } from "../api";
import tokensStorage from "../libs/localStorage";

const spyClearTokenFromStorage = jest.spyOn(tokensStorage, 'clearTokenFromStorage');
spyClearTokenFromStorage.mockReturnValue();

const spySaveTokenToStorage = jest.spyOn(tokensStorage, 'saveTokenToStorage');
spySaveTokenToStorage.mockReturnValue();

const spyApi = (methodName: any) => jest.spyOn(api, methodName);

describe('setPassword', () => {
    it('Should set correct password', () => {
        authStore.setPassword('abc123')
        expect(authStore.password).toBe('abc123')
    })
})


describe('setLogin', () => {
    it('Should set correct login', () => {
        authStore.setLogin('testLogin')
        expect(authStore.login).toBe('testLogin')
    })
})


describe('loginRequest', () => {
    it('Login success', async () => {
        authStore.login = 'testLogin'
        authStore.password = 'abc123'
        spyApi('login').mockResolvedValueOnce({ status: 200, data: { token: 'test_token_123' } })
        await authStore.loginRequest()
        expect(authStore.isAuth).toBe(true)
    })
    it('Login fail', async () => {
        authStore.login = 'testLogin'
        authStore.password = 'abc123'
        spyApi('login').mockResolvedValueOnce({ status: 500, data: { error: { message: 'Test error messange' } } })
        await authStore.loginRequest()
        expect(authStore.errorLogin).toBe('Test error messange')
    })
})


describe('logoutRequest', () => {
    it('Logout success', async () => {
        spyApi('logout').mockResolvedValueOnce({ data: { isLogout: true } })
        await authStore.logoutRequest()
        expect(authStore.isAuth).toBe(false)
    })
})


describe('authRequest', () => {
    it('Authorization success', async () => {
        spyApi('userCheckAuth').mockResolvedValueOnce({ data: { isAuth: true } })
        await authStore.authRequest()
        expect(authStore.isAuth).toBe(true)
    })

    it('Authorization fail', async () => {
        spyApi('userCheckAuth').mockReturnValueOnce({ data: { isAuth: false } })
        await authStore.authRequest()
        expect(authStore.isAuth).toBe(false)
    })

})