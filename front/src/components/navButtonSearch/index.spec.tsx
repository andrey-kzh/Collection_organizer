import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { NavButtonSearch } from './index';

describe('NavButton', () => {
    it('Should render correct snapshot', () => {
        const component = shallow(<NavButtonSearch />)
        expect(component).toMatchSnapshot()
    })
})