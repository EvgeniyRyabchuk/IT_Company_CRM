import React from 'react';
import './ModalWithTransition.scss';

export type ModalTransitionType = 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven';

const ModalWithTransition : React.FC<{
    children? : any,
    type: ModalTransitionType
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
}>
    = ({children, type, isOpen, setIsOpen}) => {

    const onModalBtnClick = (e: any, type: ModalTransitionType) => {
        e.stopPropagation();
        setIsOpen(true);
    }
    const modalContainerClick = (e: any) => {
        setIsOpen(false);
    }

    return (
        <div className={isOpen ? 'modal-active' : ''} onClick={modalContainerClick} >
            <div id="modal-container"
                 className={isOpen && type ? type : ''}>

                <div className="modal-background">
                    <div className="modal" onClick={(e) => {
                        e.stopPropagation();
                        console.log(e.target, e.currentTarget);
                    }}>
                        {children}

                    </div>
                </div>
            </div>
        </div>
    )
};

export default ModalWithTransition;