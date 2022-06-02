import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { Catalog } from './index';

const catalogState = {
  items: {
    46: {
      id: 46,
      title: 'title-1',
      anons: 'this is test anons 1',
      image: '/images/test.jpg',
      categories: [{ id: 43, title: 'Пластинки' }]
    },
    55: {
      id: 55,
      title: 'title-2',
      anons: 'this is test anons 1',
      image: '',
      categories: [{ id: 55, title: 'Кассеты' }]
    }
  },
  list: [46, 55]
}

const context = {
  authStore: {
    isAuth: true
  },
  catalogStore: {
    catalog: catalogState,
    delCatalogItem: () => { },
    setEditWindow: () => { },
    setDeleteId: () => { },
  },
  searchStore: {
    currentPage: '',
    totalPages: '',
    findNextPage: ''
  }
}

const contextCatalogNull: {} = {
  authStore: {
    isAuth: true
  },
  catalogStore: {
    catalog: null,
    delCatalogItem: () => { },
    setEditWindow: () => { },
    setDeleteId: () => { },
  },
  searchStore: {
    currentPage: '',
    totalPages: '',
    findNextPage: ''
  }
}

const contextCatalogEmpty: {} = {
  authStore: {
    isAuth: true
  },
  catalogStore: {
    catalog: {
      items: {},
      list: []
    },
    delCatalogItem: () => { },
    setEditWindow: () => { },
    setDeleteId: () => { },
  },
  searchStore: {
    currentPage: '',
    totalPages: '',
    findNextPage: ''
  }
}

describe('Catalog component', () => {

  const spyContext = jest.spyOn(React, 'useContext');

  it('Should render', () => {
    spyContext.mockReturnValue(context);
    const component = shallow(<Catalog />);
    const wrapper = component.find(".catalog")
    expect(wrapper.length).toBe(1)
  });

  it('Component loading...', () => {
    spyContext.mockReturnValue(contextCatalogNull);
    const component = shallow(<Catalog />);
    const wrapper = component.find('div')
    expect(wrapper.text()).toEqual('Loading')
  });

  it('Items not found', () => {
    spyContext.mockReturnValue(contextCatalogEmpty);
    const component = shallow(<Catalog />);
    const wrapper = component.find('.catalog').children()
    expect(wrapper.text()).toEqual('Ничего не найдено')
  });

  it('Should contain children components', () => {
    spyContext.mockReturnValue(context);
    const component = render(<Catalog />);
    const wrapper = component.find(".catalog-item")
    expect(wrapper.length).toBe(2)
  });

})