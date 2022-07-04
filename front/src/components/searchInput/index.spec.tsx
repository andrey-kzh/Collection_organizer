import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { SearchInput } from './index';


describe('SearchInput', () => {

    const mockSetSearchString = jest.fn()
    const searchStringData = 'Test search stirng'
    const context = { searchStore: { form: { searchString: searchStringData, setSearchString: mockSetSearchString } } }
    jest.spyOn(React, 'useContext').mockReturnValue(context)

    it('Should render correct snapshot', () => {
        const component = render(<SearchInput />)
        expect(component).toMatchSnapshot()
    })

    it('Should set input string', () => {
        const component = shallow(<SearchInput />)
        component.find('input').simulate('change', { target: { value: searchStringData } })
        expect(mockSetSearchString).toBeCalledWith(searchStringData)
    })

    it('Input string should contain data from store', () => {
        const component = shallow(<SearchInput />)
        expect(component.find('input').props().value).toEqual(searchStringData)
    })
})