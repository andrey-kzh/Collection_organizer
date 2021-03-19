import * as React from "react";
import './style.sass'

interface IProps {
    name: string,
    className: string,
    callback: Function,
}

export const Button: React.FC<IProps> = ({name, className, callback}) => {
    return <button onClick={() => callback()} className={`button ${className}`}>{name}</button>
}