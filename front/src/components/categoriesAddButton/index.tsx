import * as React from "react";
import './style.sass'

interface IProps {
    callback: Function
}

export const CategoriesAddButton: React.FC<IProps> = ({ callback }) => {
    return <button onClick={() => callback()} className="categorys-add-button">Категории</button>
}