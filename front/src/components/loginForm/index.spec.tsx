import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { LoginForm } from './index';


const location: any = { state: { from: { pathname: '/test-url', } } }
const mockUseHistoryReplace = jest.fn()
const history: any = { replace: mockUseHistoryReplace }

jest.mock('react-router-dom', () => {
    const reactRouterDom = jest.requireActual('react-router-dom');
    return {
        ...reactRouterDom,
        useHistory: jest.fn(() => history),
        useLocation: jest.fn(() => location),
    };
});


describe('LoginForm', () => {

    const mockLoginRequest = jest.fn()
    const mockSetLogin = jest.fn()
    const mockSetPassword = jest.fn()

    const context = (isAuth: boolean) => {
        return {
            authStore: {
                isAuth: isAuth,
                login: '',
                setLogin: mockSetLogin,
                password: '',
                setPassword: mockSetPassword,
                errorLogin: 'Test error message',
                loginRequest: mockLoginRequest
            }
        }
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Should render correct snapshot', () => {
        jest.spyOn(React, 'useContext').mockReturnValue(context(false))
        const component = shallow(<LoginForm />)
        expect(component).toMatchSnapshot()
    })

    it('Shoul redirect to history.replace url after login', () => {
        jest.spyOn(React, 'useContext').mockReturnValue(context(true))
        const component = mount(<LoginForm />)
        expect(mockUseHistoryReplace).toBeCalledWith({ pathname: '/test-url' })
    })

    it('Should set login field', () => {
        jest.spyOn(React, 'useContext').mockReturnValue(context(false))
        const component = shallow(<LoginForm />)
        component.find('input').at(0).simulate('change', { target: { value: 'Test login' } })
        expect(mockSetLogin).toBeCalledWith('Test login')
    })

    it('Should set password field', () => { 
        jest.spyOn(React, 'useContext').mockReturnValue(context(false))
        const component = shallow(<LoginForm />)
        component.find('input').at(1).simulate('change', { target: { value: 'Test password' } })
        expect(mockSetPassword).toBeCalledWith('Test password')
    })
    
    it('Should run loginRequest after click on button', () => { 
        jest.spyOn(React, 'useContext').mockReturnValue(context(false))
        const component = mount(<LoginForm />)
        component.find('button').at(0).simulate('click')
        expect(mockLoginRequest).toHaveBeenCalledTimes(1)
    })
})