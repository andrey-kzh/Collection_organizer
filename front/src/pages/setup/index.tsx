import * as React from 'react';
import './style.sass';
import {Nav} from "../../components/nav";
import {AddNewCategoryForm} from "../../components/addNewCategoryForm";
import {SetupCategoriesLent} from "../../components/setupCategoriesLent";

export const SetupPage: React.FC = () => {

    return <>
        <Nav/>
        <AddNewCategoryForm/>
        <SetupCategoriesLent/>
    </>;

}