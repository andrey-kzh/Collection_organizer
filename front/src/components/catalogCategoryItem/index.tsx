import * as React from "react";
import './style.sass'

interface IProps {
    title: string,
}

export const CatalogCategoryItem: React.FC<IProps> = React.memo(({ title }) => {
    return (              
        <div className="catalog-item__category-item">{ title }</div>
    )
}, (prevProps, nextProps) => {
    if (prevProps.title === nextProps.title) return true;
    return false
});