import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { SelectCategoriesItem } from './index';

describe('SelectCategoriesItem', () => {

    const mockAddCallback = jest.fn()
    const mockDellCallback = jest.fn()

    const props = (isActive: boolean) => {
        return {
            title: 'TestTitle',
            isActive: isActive,
            addCallback: mockAddCallback,
            delCallback: mockDellCallback,
        }
    }

    it('Should render correct html snapshot', () => {
        const component = shallow(<SelectCategoriesItem {...props(true)} />)
        expect(component).toMatchSnapshot()
    })

    it('Input element checked', () => {
        const component = shallow(<SelectCategoriesItem {...props(false)} />)
        component.find('.select-category-item__input').simulate('change')
        expect(mockAddCallback).toHaveBeenCalledTimes(1)
        //expect(component.find('.select-category-item__input')).toBeChecked()
    })

    it('Input element unchecked', () => {
        const component = shallow(<SelectCategoriesItem {...props(true)} />)
        component.find('.select-category-item__input').simulate('change')
        expect(mockDellCallback).toHaveBeenCalledTimes(1)
        //expect(component.find('.select-category-item__input')).not.toBeChecked()
    })
})