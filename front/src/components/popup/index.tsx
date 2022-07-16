import * as React from "react";
import './style.sass'

interface IProps {
    className: String,
    closeCallback: () => void,
}

export const Popup: React.FC<IProps> = ({ className, closeCallback, children }) => {
    return (
        <div className={`popup-wrap ${className}`}>
            <div className="popup">
                <div className="popup__close-wrap">
                    <button
                        onClick={() => closeCallback()}
                        className="popup__close">
                    </button>
                </div>
                <div className="popup__content">
                    {children}
                </div>
            </div>
        </div>
    )
}