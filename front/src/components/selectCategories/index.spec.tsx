import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { SelectCategories } from './index';

describe('SelectCategories', () => {

    const context = {
        categoriesStore: {
            categories: {
                items: {
                    112: { id: 112, title: 'testCategoriesTitle_01' },
                    113: { id: 113, title: 'testCategoriesTitle_02' },
                    114: { id: 114, title: 'testCategoriesTitle_03' }
                },
                list: [112, 113, 114]
            },
            getAllCategories: jest.fn()
        }
    }

    jest.spyOn(React, 'useContext').mockReturnValue(context)

    const props = {
        selectdedCategories: [112, 113],
        delSelectdedCategories: jest.fn(),
        addSelectdedCategories: jest.fn(),
        setIsOpen: jest.fn(),
    }

    it('Should render correct snapshot', () => {
        const component = render(<SelectCategories {...props} />)
        expect(component).toMatchSnapshot()
    })
})