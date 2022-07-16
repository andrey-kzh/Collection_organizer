import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { CategoriesItem } from './index';

describe('CategoriesItem', () => {

    const mockDelCallback = jest.fn()
    const props = {
        title: 'Test Title',
        delCallback: mockDelCallback
    }
    const component = shallow(<CategoriesItem {...props} />)

    it('Should render correct html snapshot', () => {
        expect(component).toMatchSnapshot()
    })

    it('Should call callback function when click on button', () => { 
        component.find('button').simulate('click')
        expect(mockDelCallback).toBeCalledTimes(1)
    })
})