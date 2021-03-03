import * as React from "react";
import './style.sass'

interface NavLinkProps {
    name:String,
    //link:String,
    //onClick():void
}

export const NavLink:React.FC<NavLinkProps> = ({name}) => {
    return <a className="nav-link" href="#">{name}</a>
}