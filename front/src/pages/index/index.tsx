import * as React from 'react';
import './style.sass';

import {Nav} from '../../components/nav'
import {SearchForm} from '../../components/searchForm'

export const IndexPage: React.FC = () => {

    return <>
        <Nav/>
        <SearchForm/>
          </>;
}