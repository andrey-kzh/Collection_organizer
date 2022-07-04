import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { Popup } from './index';

describe('NavButton', () => {

    const mockCloseCallback = jest.fn()
    const props = {
        className: 'test-classname',
        closeCallback: mockCloseCallback,
    }

    const componentWrap = <Popup {...props} >{<div className='children-classname'>test children</div>}</Popup>

    it('Should render correct snapshot', () => {
        const component = render(componentWrap)
        expect(component).toMatchSnapshot()
    })

    it('Should render div with classname from props', () => {
        const component = shallow(componentWrap)
        expect(component.find('.test-classname').length).toEqual(1)
    })

    it('Should run closeCallback when click on button', () => { 
        const component = shallow(componentWrap)
        component.find('.popup__close').at(0).simulate('click')
        expect(mockCloseCallback).toBeCalledTimes(1)

    })
})