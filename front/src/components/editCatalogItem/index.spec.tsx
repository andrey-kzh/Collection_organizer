import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { EditCatalogItem } from './index';

describe('EditCatalogItem', () => {

    const mockSaveCatalogItem = jest.fn();
    const mockSetEditWindow = jest.fn();

    const context = {
        catalogStore: {
            editWindow: {
                isOpen: true,
                title: 'Test title',
                anons: 'Test anons',
                relatedCategories: [12, 13],
                previewImg: '/test/img.jpg'
            },
            saveCatalogItem: mockSaveCatalogItem,
            setEditWindow: mockSetEditWindow,
            addRelatedCategories: () => { },
            delRelatedCategories: () => { }
        }
    }

    beforeEach(() => {
        jest.spyOn(React, 'useContext').mockReturnValue(context)
        jest.spyOn(React, 'useRef').mockReturnValue({ current: '' })
    })

    afterEach(() => { jest.clearAllMocks() })

    it('Should render correct html snapshot', () => {
        const component = shallow(<EditCatalogItem />)
        expect(component).toMatchSnapshot()
     })

    it('Should set edit window params for upload file', () => {
        const component = shallow(<EditCatalogItem />)
        const fileForTest = new File([""], "test_file.jpg", { type: "image/jpeg" })
        global.URL.createObjectURL = jest.fn(() => 'testUrl');
        component.find('.edit-cat-item-form__img-input').simulate('change', { target: { files: [fileForTest] } })
        expect(mockSetEditWindow).toHaveBeenCalledWith({ img: fileForTest, previewImg: 'testUrl' })
    })

    it('Should unset upload file params', () => { 
        const component = shallow(<EditCatalogItem />)
        component.find('.edit-cat-item-form-del').simulate('click')
        expect(mockSetEditWindow).toHaveBeenCalledWith({ img: '', previewImg: '' })
    })

    it('Should set title', () => {
        const component = shallow(<EditCatalogItem />)
        component.find('.edit-cat-item-form__input').simulate('change', { target: { value: 'testTitle' } })
        expect(mockSetEditWindow).toHaveBeenCalledWith({ title: 'testTitle' })
     })
    it('Should set anons', () => { 
        const component = shallow(<EditCatalogItem />)
        component.find('.edit-cat-item-form__textarea').simulate('change', { target: { value: 'testAnons' } })
        expect(mockSetEditWindow).toHaveBeenCalledWith({ anons: 'testAnons' })
    })
    it('Should save form', () => { 
        const component = shallow(<EditCatalogItem />)
        component.find('.button').at(1).simulate('click')
        expect(mockSaveCatalogItem).toHaveBeenCalledTimes(1)
    })
})