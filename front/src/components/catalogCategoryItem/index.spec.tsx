import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { CatalogCategoryItem } from './index';

describe('CatalogCategoryItem', () => {
    it('Should render correct html snapshot', () => {
        const component = shallow(<CatalogCategoryItem {...{ title: 'Test-Title' }} />)
        expect(component).toMatchSnapshot()
    })
})