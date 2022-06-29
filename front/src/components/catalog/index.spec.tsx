import React from 'react'
import { mount, shallow, render } from 'enzyme';
import { Catalog } from './index';

interface ICatalogState { items: {}, list: number[] | [] }

const catalogFullState: ICatalogState = {
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

const catalogEmptyState: ICatalogState = {
    items: {},
    list: []
}

describe('Catalog component', () => {

  const mockSetEditWindow = jest.fn()

  const context = (catalogState: ICatalogState) => {
    return {
      authStore: {
        isAuth: true
      },
      catalogStore: {
        catalog: catalogState,
        delCatalogItem: () => { },
        setEditWindow: mockSetEditWindow,
        setDeleteId: () => { },
      },
      searchStore: {
        currentPage: '',
        totalPages: '',
        findNextPage: ''
      }
    }
  }

  const spyContext = jest.spyOn(React, 'useContext');

  it('Should render', () => {
    spyContext.mockReturnValue(context(catalogEmptyState));
    const component = shallow(<Catalog />);
    const wrapper = component.find(".catalog")
    expect(wrapper.length).toBe(1)
  });

  it('Component loading...', () => {
    spyContext.mockReturnValue(context(null));
    const component = shallow(<Catalog />);
    const wrapper = component.find('div')
    expect(wrapper.text()).toEqual('Loading')
  });

  it('Items not found', () => {
    spyContext.mockReturnValue(context(catalogEmptyState));
    const component = shallow(<Catalog />);
    const wrapper = component.find('.catalog').children()
    expect(wrapper.text()).toEqual('Ничего не найдено')
  });

  it('Should contain children components', () => {
    spyContext.mockReturnValue(context(catalogFullState));
    const component = render(<Catalog />);
    const wrapper = component.find(".catalog-item")
    expect(wrapper.length).toBe(2)
  });

  it('Should render popup confirmation window when click delete button', () => {
    spyContext.mockReturnValue(context(catalogFullState));
    const component = mount(<Catalog />);
   component.find(".button").at(1).simulate('click')
    expect(component.find(".popup-wrap").length).toBe(1)
  })

  it('editCallback should been called 1 times when click edit button', () => {
    spyContext.mockReturnValue(context(catalogFullState));
    const component = mount(<Catalog />);
    component.find(".button").at(0).simulate('click')
    expect(mockSetEditWindow).toHaveBeenCalledTimes(1)
  })


})