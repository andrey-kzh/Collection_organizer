import * as React from 'react';
import './style.sass';
import {Nav} from "../../components/nav";
import {AddNewCategoryForm} from "../../components/addNewCategoryForm";
import {SetupCategories} from "../../components/setupCategories";

export const SetupPage: React.FC = () => {

    return <>
        <Nav/>
        <AddNewCategoryForm/>
        <SetupCategories/>
    </>;

}