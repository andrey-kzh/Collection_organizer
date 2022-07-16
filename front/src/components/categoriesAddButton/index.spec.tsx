import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { CategoriesAddButton } from './index';

describe('CategoriesAddButton', () => {

    const mockCallback = jest.fn()

    afterEach(() => {
        jest.clearAllMocks()
    })

    const component = shallow(<CategoriesAddButton callback={mockCallback} />)

    it('Should render correct html snapshot', () => {
        expect(component).toMatchSnapshot()
    })

    it('Should call callback function when click on button', () => {
        component.find("button").simulate('click')
        expect(mockCallback).toHaveBeenCalledTimes(1)
    })

})