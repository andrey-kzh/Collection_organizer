import * as React from "react";
import './style.sass'
import { observer } from "mobx-react";
import { store } from "../../store";
import { Popup } from "../popup"
import { Categories } from "../categories";


export const EditCatalogItem: React.FC = observer(() => {

    const { catalogStore: { editWindow: { isOpen, title, anons, relatedCategories, previewImg },
        addCatalogItem, setEditWindow, addRelatedCategories, delRelatedCategories } } = React.useContext(store)


    const fileInput = React.useRef(null);

    const handleImg = (input: HTMLInputElement) => {
        setEditWindow({ img: input.files[0], previewImg: URL.createObjectURL(input.files[0]) })
        fileInput.current.value = null
    }

    return (

        isOpen && <Popup className='' closeCallback={() => setEditWindow({ isOpen: false })}>

            <form onSubmit={(e) => e.preventDefault()} className="edit-cat-item-form">

                <div className="edit-cat-item-form__img-wrap">
                    <div>

                        <div className="edit-cat-item-form__input-title">Изображение</div>
                        <label className="button edit-cat-item-form__img-button">
                            Открыть
                        <input ref={fileInput}
                                onChange={(e) => handleImg(e.target)}
                                className="edit-cat-item-form__img-input"
                                accept="image/x-png,image/gif,image/jpeg"
                                type="file"
                                name="image" />
                        </label>

                    </div>

                    <div className="edit-cat-item-form__img" style={{ backgroundImage: `url(${previewImg})` }}>
                        {
                            previewImg && <button onClick={() => setEditWindow({ img: '', previewImg: '' })}
                                className="edit-cat-item-form-del"></button>
                        }
                    </div>

                </div>

                <div className="edit-cat-item-form__input-wrap">

                    <div className="edit-cat-item-form__input-title">Заголовок</div>
                    <input onChange={(e) => setEditWindow({ title: e.target.value })}
                        value={title}
                        className="edit-cat-item-form__input" type="text" name="title" />

                    <div className="edit-cat-item-form__input-title">Описание</div>
                    <textarea onChange={(e) => setEditWindow({ anons: e.target.value })}
                        value={anons}
                        className="edit-cat-item-form__textarea" name="anons"></textarea>

                </div>

                <Categories
                    selectdedCategories={relatedCategories}
                    addSelectdedCategories={addRelatedCategories}
                    delSelectdedCategories={delRelatedCategories} />

                <div className="edit-cat-item-form__submit-wrap">
                    <button onClick={() => addCatalogItem()} className="button">Сохранить</button>
                </div>

            </form>

        </Popup>
    )

})