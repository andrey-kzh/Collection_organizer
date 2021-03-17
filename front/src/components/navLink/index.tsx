import * as React from "react";
import './style.sass'

interface IProps {
    name:String,
    //link:String,
    //onClick():void
}

export const NavLink:React.FC<IProps> = ({name}) => {
    return <a className="nav-link" href="#">{name}</a>
}