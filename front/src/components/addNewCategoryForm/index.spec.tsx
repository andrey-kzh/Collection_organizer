import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { AddNewCategoryForm } from './index';

describe('AddNewCategoryForm', () => {

    const setCategoryTitle = jest.fn()
    const addCategoryItem = jest.fn()

    const context = {
        setupStore: {
            categoryTitle: 'Test-Title',
            setCategoryTitle: setCategoryTitle,
            addCategoryItem: addCategoryItem
        }
    }

    jest.spyOn(React, 'useContext').mockReturnValue(context)

    it('Should render correct html snapshot', () => {
        const component = shallow(<AddNewCategoryForm />)
        expect(component).toMatchSnapshot()
    })

    it('Should be called function when a value is entered', () => {
        const component = mount(<AddNewCategoryForm />)
        component.find('input').at(0).simulate('change', { target: { value: 'test-value' } })
        expect(setCategoryTitle).toHaveBeenCalledTimes(1)
    })

    it('Should be called function when click on button', () => {
        const component = mount(<AddNewCategoryForm />)
        component.find('button').at(0).simulate('click')
        expect(addCategoryItem).toHaveBeenCalledTimes(1)
    })

    it('Input field value should be correct', () => {
        const component = shallow(<AddNewCategoryForm />)
        expect(component.find("input").get(0).props.value).toEqual("Test-Title");
    })

})