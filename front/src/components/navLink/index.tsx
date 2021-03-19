import * as React from "react";
import './style.sass'

interface IProps {
    name:String,
    link?:String,
}

export const NavLink:React.FC<IProps> = ({name, link}) => {
    return <a className="nav-link" href={`${link}`}>{name}</a>
}