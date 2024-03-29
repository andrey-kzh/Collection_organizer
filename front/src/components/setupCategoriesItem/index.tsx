import * as React from "react";
import './style.sass'
import { Button } from "../button";

interface IProps {
    id: number,
    title: string,
    openEditWindow?: () => void,
}

export const SetupCategoriesItem: React.FC<IProps> = React.memo(({ title, openEditWindow }) => {
    return (
        <div className="setup-categorys__item">
            <span className="setup-categorys__header">{title}</span>
            <Button
                name="Редактировать"
                className="button_setup-categorys-item"
                callback={openEditWindow} />
        </div>
    )

}, (prevProps, nextProps) => {
    if (prevProps.title === nextProps.title) return true;
    return false
});