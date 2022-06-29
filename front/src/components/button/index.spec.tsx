import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { Button } from './index';

const callbackFunc = jest.fn()
const props = {
    name: 'TestName',
    className: 'test-classname',
    callback: callbackFunc,
}

describe('Button', () => {
    const component = shallow(<Button {...props} />)

    it('Should render component snapshot', () => {
        expect(component).toMatchSnapshot()
    })

    it('Should find classname prop', () => {
        expect(component.find(".test-classname").length).toBe(1)
    })

    it('Callback function should be called 1 times', () => {
        component.find(".button").at(0).simulate('click')
        expect(callbackFunc).toHaveBeenCalledTimes(1)
    })

})