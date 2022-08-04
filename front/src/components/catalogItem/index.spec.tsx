import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { CatalogItem } from './index';

//const testFunc = jest.fn()
const props = {
    isAuth: true,
    title: 'testTitle',
    anons: 'testAnons',
    image: '/img/test.jpg',
    categories: [{ id: 12, title: 'testCategoriesTitle_01' }, { id: 13, title: 'testCategoriesTitle_02' }],
    editCallback: ()=>{},
    delCallback: ()=>{}
}

describe('CatalogItem', () => {

    const intersectionObserverMock = () => ({ observe: () => {} })
    window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

    it('Should render component snapshot', () => {
        const component = shallow(<CatalogItem {...props} />)
        expect(component).toMatchSnapshot()
    })
})