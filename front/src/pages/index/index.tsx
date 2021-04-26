import * as React from 'react';
import './style.sass';

import { Nav } from '../../components/nav'
import { SearchForm } from '../../components/searchForm'
import { EditCatalogItem } from '../../components/editCatalogItem'

export const IndexPage: React.FC = () => {

  return <>
    <Nav />
    <SearchForm />
    <EditCatalogItem />
  </>;
}