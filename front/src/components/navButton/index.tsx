import * as React from "react";
import './style.sass'

interface IProps {
    name:String,
    //link:String,
    //onClick():void
}

export const NavButton:React.FC<IProps> = ({name}) => {
    return <button className="nav-button">{name}</button>
}