import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { SetupCategoriesItem } from './index';

describe('SetupCategoriesItem', () => {

    const mockOpenEditWindow = jest.fn()
    const props = {
        id: 12,
        title: 'Test title',
        openEditWindow: mockOpenEditWindow
    }

    it('Should render correct snapshot', () => {
        const component = render(<SetupCategoriesItem {...props} />)
        expect(component).toMatchSnapshot()
    })

    it('Should call openEditWindow when click on edit button', () => {
        const component = mount(<SetupCategoriesItem {...props} />)
        component.find('button').simulate('click')
        expect(mockOpenEditWindow).toBeCalledTimes(1)
    })
})