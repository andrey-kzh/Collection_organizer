import axios, { AxiosRequestConfig } from "axios";
import { api } from "./index";
// Функция getTokenFromStorage должна быть частью модуля tokensStorage чтобы ее замокать. 
// Просто импортированную функцию мокать нельзя
import tokensStorage from "../libs/localStorage";

jest.mock('axios')

test('should fetch any request', async () => {

    // mock function in function
    (axios as unknown as jest.Mock).mockResolvedValueOnce({ data: { result: 'true' } });
    const spy = jest.spyOn(tokensStorage, 'getTokenFromStorage'); //getTokenFromStorage функцию подменили
    spy.mockReturnValue('mocked');

    //mock axios
    //(axios as undefined as jest.Mock).mockImplementation(() => Promise.resolve({ data: {result: true} }));
    //(axios as unknown as jest.Mock).mockResolvedValueOnce({ data: { result: 'true' } });
    //const res = await api.login('login', 'pass').then((data) => data)

    const options: AxiosRequestConfig = {
        url: `/users/login/`,
        method: 'POST',
        data: {}
    };
   
    const res = await api.requestWithToken(options).then((data) => data)
})

