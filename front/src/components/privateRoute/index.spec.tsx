import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { PrivateRoute } from './index';
import { BrowserRouter as Router } from "react-router-dom";

describe('PrivateRoute', () => {

    const context = (isAuth: boolean) => {
        return { authStore: { isAuth: isAuth } }
    }

    jest.spyOn(React, 'useContext').mockReturnValue(context(true))

    it('Should render correct snapshot', () => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(context(true))
        const component = mount(<Router><PrivateRoute path='/some-url/'>{<div>test child</div>}</PrivateRoute></Router>)
        expect(component).toMatchSnapshot()
    })
})