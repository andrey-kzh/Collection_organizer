import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { SetupCategoriesEditWin } from './index';

describe('SetupCategoriesEditWin', () => {

    const titleData = 'Test title'
    const mockUpdateCategoryItem = jest.fn()

    const context = (isOpen: boolean) => {
        return {
            setupStore: {
                editWindow: {
                    isOpen: isOpen,
                    title: titleData
                },
                setEditWindow: jest.fn(),
                updateCategoryItem: mockUpdateCategoryItem,
                deleteCategoryItem: jest.fn()
            }
        }
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Should render correct snapshot', () => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(context(true))
        const component = render(<SetupCategoriesEditWin />)
        expect(component).toMatchSnapshot()
    })

    it('Should not render when isOpen = false', () => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(context(false))
        const component = render(<SetupCategoriesEditWin />)
        expect(component.find('.setup-category-edit').length).toEqual(0)
    })

    it('Input contain title in value', () => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(context(true))
        const component = shallow(<SetupCategoriesEditWin />)
        expect(component.find('input').props().value).toEqual(titleData)
    })

    it('Should call setEditWindow when input change', () => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(context(true))
        const component = shallow(<SetupCategoriesEditWin />)
        component.find('input').simulate('change', { target: { value: 'Test title value' } })
    })

    it('Should call updateCategoryItem when click on save button', () => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(context(true))
        const component = shallow(<SetupCategoriesEditWin />)
        component.find('.button_catalog-item').at(0).simulate('click')
        expect(mockUpdateCategoryItem).toHaveBeenCalledTimes(1)
    })

    it('Should open confirmation dialog when click on delete button', () => {
        //jest.spyOn(React, 'useContext').mockReturnValueOnce(context(true))
        //const component = mount(<SetupCategoriesEditWin />)
        //component.find('.button_catalog-item').at(1).simulate('click')
        //expect(component.find('.popup-delete-confirmation__header').length).toEqual(1)
    })
})