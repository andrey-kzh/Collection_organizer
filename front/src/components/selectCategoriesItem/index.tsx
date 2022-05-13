import * as React from "react";
import './style.sass'

interface IProps {
    title: string,
    isActive: boolean,
    addCallback?: () => void,
    delCallback?: () => void,
}

export const SelectCategoriesItem: React.FC<IProps> = React.memo(({ title, isActive, addCallback, delCallback }) => {

    let [checked, setChecked] = React.useState(isActive)

    const check = (isChecked: boolean) => {
        setChecked(isChecked);
        (isChecked) ? addCallback() : delCallback();
    }

    return (
        <label className="select-category-item">
            <input className="select-category-item__input"
                name="category_item"
                type="checkbox"
                onChange={() => check(!checked)}
                checked={checked} />
            <span className="select-category-item__title">{title}</span>
        </label>
    )
}, (prevProps, nextProps) => {
    if (prevProps.isActive === nextProps.isActive) return true;
    return false
});