import * as React from "react";
import './style.sass'

interface NavButtonProps {
    name:String,
    //link:String,
    //onClick():void
}

export const NavButton:React.FC<NavButtonProps> = ({name}) => {
    return <button className="nav-button">{name}</button>
}