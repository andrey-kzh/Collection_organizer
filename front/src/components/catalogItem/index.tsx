import React, { useEffect, useRef, useState } from "react";
import './style.sass'
import { Button } from "../button";
import { CatalogCategoryItem } from "../catalogCategoryItem"
import useIntersecting from "../../hooks/useIntersectionObserver"

interface IProps {
    isAuth: boolean,
    title: string,
    anons: string,
    image: string,
    categories: { id: number, title: string }[],
    editCallback?: Function,
    delCallback?: Function
}

export const CatalogItem: React.FC<IProps> = React.memo(({ isAuth, title, anons, image, categories, editCallback, delCallback }) => {

    const renderCategories = () => {
        return categories.map((category: { [index: string]: any }) => {
            if (category.id) {
                return <CatalogCategoryItem title={category.title} key={category.id} />
            }
        })
    }

    const [animatedClass, setAnimatedClass] = useState('')
    const animatedBlock = useRef()
    const isIntersecting = useIntersecting(animatedBlock)
    if (isIntersecting && (animatedClass === '')) setAnimatedClass('catalog-item_animated')

    return (
        <div ref={animatedBlock} className={`catalog-item ${animatedClass}`}>

            <div className="catalog-item__img__wrap">
                <img alt={title} className="catalog-item__img" src={`${image ? process.env.BACKEND_HOST + image : ''}`} />
            </div>

            <div className="catalog-item__txt">
                <div className="catalog-item__header">{title}</div>

                <div className="catalog-item__categorys">
                    {renderCategories()}
                </div>

                <div className="catalog-item__anons">{anons}</div>
            </div>
            <div className="catalog-item__ctrl-buttons">

                {isAuth && <Button
                    className="button_catalog-item"
                    name="Редактировать"
                    callback={editCallback} />
                }

                {isAuth && <Button
                    className="button_catalog-item"
                    name="Удалить"
                    callback={delCallback} />
                }
            </div>
        </div>

    )
}, (prevProps, nextProps) => {
    if (prevProps.title === nextProps.title &&
        prevProps.anons === nextProps.anons &&
        prevProps.image === nextProps.image &&
        prevProps.isAuth === nextProps.isAuth &&
        JSON.stringify(prevProps.categories) === JSON.stringify(nextProps.categories)
    ) return true;
    return false
});