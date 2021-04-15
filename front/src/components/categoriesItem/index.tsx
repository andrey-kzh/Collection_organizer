import * as React from "react";
import './style.sass'

interface IProps {
    title: string,
    delCallback?: Function
}

export const CategoriesItem: React.FC<IProps> = React.memo(({ title, delCallback }) => {
    return (
        <label className="category-item">
            <div className="category-item__title">{title}</div>
            <input className="category-item__input" type="checkbox" name="category_item" />
            <button onClick={() => delCallback()} className="category-item__close"> </button>
        </label>
    )
}, (prevProps, nextProps) => {
    if (prevProps.title === nextProps.title) return true;
    return false
});