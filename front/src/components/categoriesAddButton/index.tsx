import * as React from "react";
import './style.sass'

interface IProps {
    callback: () => void
}

export const CategoriesAddButton: React.FC<IProps> = ({ callback }) => {
    return <button onClick={() => callback()} className="categorys-add-button">Категории</button>
}