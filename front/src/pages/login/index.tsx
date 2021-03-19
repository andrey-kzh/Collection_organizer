import * as React from 'react';
import './style.sass';
import {Nav} from "../../components/nav";
import {LoginForm} from "../../components/loginForm";

export const LoginPage: React.FC = () => {

    return <>
        <Nav/>
        <LoginForm/>
    </>;

}