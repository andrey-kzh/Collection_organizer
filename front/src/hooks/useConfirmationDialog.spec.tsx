import React from 'react'
import { mount, shallow, render } from 'enzyme';
import useConfirmationDialog from './useConfirmationDialog'

describe('useConfirmationDialog', () => {

    const mockOnConfirmClick = jest.fn()
    const props = {
        header: 'Delete this item?',
        confirmTitle: 'Yes',
        cancelTitle: 'No',
        onConfirmClick: mockOnConfirmClick,
    }

    const mockSetIsOpen = jest.fn();
    const setup = (init: boolean) => {
        jest.spyOn(React, 'useState').mockImplementation(() => [init, mockSetIsOpen])
        return () => { //Обертка из функционального компонента. Хуки можно вызывать только внутри FC.
            let { onOpen, ConfirmationDialog } = useConfirmationDialog(props)
            return <ConfirmationDialog />
        }
    }

    it('Should call "setIsOpen(false)" when click on close button', () => {
        const HookWrap: React.FC = setup(true)
        const component = mount(<HookWrap />)
        component.find(".button").at(1).simulate('click')
        expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    })

    it('Should render component when state isOpen = true', () => {
        const HookWrap: React.FC = setup(true)
        const component = mount(<HookWrap />)
        expect(component.find(".popup-wrap").length).toBe(1)
    })

    it('Shouldn\'t render component when state isOpen = false', () => {
        const HookWrap: React.FC = setup(false)
        const component = mount(<HookWrap />)
        expect(component.find(".popup-wrap").length).toBe(0)
    })

    it('Should call "onConfirmClick" when click confirm button', () => {
        const HookWrap: React.FC = setup(true)
        const component = mount(<HookWrap />)
        component.find(".button").at(0).simulate('click')
        expect(mockOnConfirmClick).toHaveBeenCalledTimes(1)
    })
})