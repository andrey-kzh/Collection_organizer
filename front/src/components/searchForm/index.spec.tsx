import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { SearchForm } from './index';
import { useLocation } from "react-router-dom";


const mockUseHistoryPush = jest.fn()
const history: any = { push: mockUseHistoryPush }

jest.mock('react-router-dom', () => {
    const reactRouterDom = jest.requireActual('react-router-dom');
    return {
        ...reactRouterDom,
        useHistory: jest.fn(() => history),
        useLocation: jest.fn(),
    };
});

describe('SearchForm', () => {

    const mockFind = jest.fn()
    const mockSetTotalPages = jest.fn()
    const mockSetRequestParams = jest.fn()
    const mockSetRequestParamsFromBowserSearchString = jest.fn()

    const searchStringData = 'Test search string'
    const selectdedCategoriesData = [112, 113]

    const context = {
        searchStore: {
            find: mockFind,
            setTotalPages: mockSetTotalPages,
            setRequestParams: mockSetRequestParams,
            setRequestParamsFromBowserSearchString: mockSetRequestParamsFromBowserSearchString,
            form: {
                selectdedCategories: selectdedCategoriesData,
                addSelectdedCategories: jest.fn(),
                delSelectdedCategories: jest.fn(),
            },
            request: {
                searchString: searchStringData,
            }
        },
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
    const testUrl = encodeURI(`?search=${searchStringData}&categories=${selectdedCategoriesData}`)

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Should render correct snapshot', () => {
        const component = shallow(<SearchForm />)
        expect(component).toMatchSnapshot()
    })

    it('Should run onClickFind and test search functions when click on button', () => {
        const component = shallow(<SearchForm />)
        component.find('.search-form__button').simulate('click')
        expect(mockSetRequestParams).toBeCalledTimes(1)
        expect(mockUseHistoryPush).toBeCalledWith(`/${testUrl}`)
        expect(mockSetTotalPages).toBeCalledTimes(1)
        expect(mockFind).toBeCalledTimes(1)
    })

    it('Should run useEffect and test search functions', () => {
        (useLocation as jest.Mock).mockReturnValueOnce({ search: testUrl })
        const component = mount(<SearchForm />)
        expect(mockSetRequestParamsFromBowserSearchString).toBeCalledWith(searchStringData, selectdedCategoriesData)
        expect(mockSetTotalPages).toBeCalledTimes(1)
        expect(mockFind).toBeCalledTimes(1)
    })
})