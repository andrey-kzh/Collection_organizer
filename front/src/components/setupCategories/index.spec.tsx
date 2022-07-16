import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { SetupCategories } from './index';

describe('SetupCategories', () => {

    const categoriesFullState = {
        items: {
            112: { id: 112, title: 'testCategoriesTitle_01' },
            113: { id: 113, title: 'testCategoriesTitle_02' },
            114: { id: 114, title: 'testCategoriesTitle_03' }
        },
        list: [112, 113, 114]
    }

    const mockGetAllCategories = jest.fn()
    const context = (categoriesState: {} | null) => {
        return {
            categoriesStore: {
                categories: categoriesState,
                getAllCategories: mockGetAllCategories
            },
            setupStore: {
                editWindow: {
                    isOpen: false,
                    title: 'test title',
                },
                setEditWindow: jest.fn(),
                updateCategoryItem: jest.fn(),
                deleteCategoryItem: jest.fn(),
            }
        }
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Should render correct snapshot', () => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(context(categoriesFullState))
        const component = render(<SetupCategories />)
        expect(component).toMatchSnapshot()
    })

    it('useEffect should call getAllCategories', () => {
        jest.spyOn(React, 'useContext').mockReturnValueOnce(context(null))
        const component = mount(<SetupCategories />)
        expect(mockGetAllCategories).toBeCalledTimes(1)
    })
})