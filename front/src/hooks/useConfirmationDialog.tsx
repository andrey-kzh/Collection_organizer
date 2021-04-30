import React, { useCallback, useState } from "react";
import { Popup } from "../components/popup"
import { Button } from "../components/button"

export default function useConfirmationDialog({ header, confirmTitle, cancelTitle, onConfirmClick }: { [index: string]: any }) {

    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => setIsOpen(!isOpen)

    const ConfirmationDialog = useCallback(() => {
        return isOpen &&
            <Popup closeCallback={onOpen} className={"popup-wrap_delete-confirmation"}>
                <div className="popup-delete-confirmation__header">{header}</div>
                <div className="popup-delete-confirmation__buttons-wrap">
                    <Button
                        name={confirmTitle}
                        className={''}
                        callback={() => onConfirmClick()} />

                    <Button
                        name={cancelTitle}
                        className={''}
                        callback={onOpen} />
                </div>

            </Popup>
    }, [isOpen])
    return { onOpen, ConfirmationDialog }
}