import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { Nav } from './index';
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";


jest.mock('react-router-dom', () => {
    const reactRouterDom = jest.requireActual('react-router-dom');
    return {
        ...reactRouterDom,
        useLocation: jest.fn(),
    };
});


const componentWrapper = () => {
    return (
        <Router>
            <Nav />
        </Router>
    )
}


describe('Nav', () => {

    const mockLogoutRequest = jest.fn();
    const mockSetEditWindow = jest.fn();

    const context = (isAuth: boolean) => {
        return {
            authStore: {
                isAuth: isAuth,
                logoutRequest: mockLogoutRequest,
            }, catalogStore: {
                setEditWindow: mockSetEditWindow
            }
        }
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Should render correct snapshot', () => {
        (useLocation as jest.Mock).mockReturnValueOnce({ pathname: '/' })
        jest.spyOn(React, 'useContext').mockReturnValue(context(true))
        const component = render(componentWrapper())
        expect(component).toMatchSnapshot()
    })

    it('Should not render menu for non auth users (isAuth = false)', () => {
        (useLocation as jest.Mock).mockReturnValueOnce({ pathname: '/' })
        jest.spyOn(React, 'useContext').mockReturnValue(context(false))
        const component = render(componentWrapper())
        expect(component.find('.nav-wrap').children().length).toEqual(1)
    })

    it('Should render link with class .nav-link-search in menu (location != /)', () => {
        (useLocation as jest.Mock).mockReturnValueOnce({ pathname: '/other-page/' })
        jest.spyOn(React, 'useContext').mockReturnValue(context(true))
        const component = render(componentWrapper())
        expect(component.find('.nav-link-search').length).toEqual(1)
        expect(component.find('.nav-button-search').length).toEqual(0)
    })

    it('Should not render button "Добавить" (location != /)', () => { 
        (useLocation as jest.Mock).mockReturnValueOnce({ pathname: '/other-page/' })
        jest.spyOn(React, 'useContext').mockReturnValue(context(true))
        const component = render(componentWrapper())
        expect(component.find('.nav-button').length).toEqual(1)
        expect(component.find('.nav-button').text()).not.toEqual('Добавить')
    })

    it('Should run setEditWindow when click on button', () => { 
        (useLocation as jest.Mock).mockReturnValueOnce({ pathname: '/' })
        jest.spyOn(React, 'useContext').mockReturnValue(context(true))
        const component = mount(componentWrapper())
        component.find('.nav-button').at(0).simulate('click')
        expect(mockSetEditWindow).toBeCalledTimes(1)
    })

    it('Should run logoutRequest when click on button', () => { 
        (useLocation as jest.Mock).mockReturnValueOnce({ pathname: '/' })
        jest.spyOn(React, 'useContext').mockReturnValue(context(true))
        const component = mount(componentWrapper())
        component.find('.nav-button').at(1).simulate('click')
        expect(mockLogoutRequest).toBeCalledTimes(1)
    })
})