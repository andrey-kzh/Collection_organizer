import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { NavButton } from './index';

describe('NavButton', () => {

    const mockCallback = jest.fn()
    const props = {
        name: 'Test-Name',
        callback: mockCallback
    }

    const component = shallow(<NavButton {...props} />)

    it('Should render correct snapshot', () => {
        expect(component).toMatchSnapshot()
    })

    it('Should render correct button name', () => {
        expect(component.find('button').text()).toEqual('Test-Name')
    })

    it('Should run callback when click on button', () => {
        component.find('button').simulate('click')
        expect(mockCallback).toBeCalledTimes(1)
    })
})

