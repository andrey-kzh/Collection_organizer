import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { Categories } from './index';

describe('Categories', () => {

    const props = {
        selectdedCategories: [12, 13],
        delSelectdedCategories: () => { },
        addSelectdedCategories: () => { }
    }
    const categoriesFullState = {
        items: {
            12: { id: 12, title: 'testCategoriesTitle_01' },
            13: { id: 13, title: 'testCategoriesTitle_02' },
            14: { id: 14, title: 'testCategoriesTitle_03' }
        },
        list: [12, 13, 14]
    }
    const mockGetAllCategories = jest.fn()
    const context = (categoriesState: {} | boolean) => {
        return {
            categoriesStore: {
                categories: categoriesState,
                getAllCategories: mockGetAllCategories
            }
        }
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Should render html snapshot', () => {
        jest.spyOn(React, 'useContext').mockReturnValue(context(categoriesFullState))
        const component = shallow(<Categories {...props} />)
        expect(component).toMatchSnapshot()
    })

    it('Should request categories data and render loading stab', () => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(context(null))
        const component = mount(<Categories {...props} />)
        expect(mockGetAllCategories).toHaveBeenCalledTimes(1)
        expect(component.find('div').at(0).text()).toEqual('Loading')
    })

    it('Should render SelectCategories component when button is clicked', () => {
        jest.spyOn(React, 'useContext').mockReturnValue(context(categoriesFullState))
        const component = mount(<Categories {...props} />)
        component.find('.categorys-add-button').simulate('click')
        expect(component.find('.select-category').length).toEqual(1)
    })




})