import * as React from "react";
import './style.sass'

interface IProps {
    name: String,
    callback?: Function,
}

export const NavButton: React.FC<IProps> = ({name, callback}) => {
    return <button onClick={() => callback()} className="nav-button">{name}</button>
}