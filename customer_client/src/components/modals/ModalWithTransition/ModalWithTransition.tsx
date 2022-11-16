import React from 'react';
import './ModalWithTransition.scss';
import {Close} from "@mui/icons-material";
import {Box, IconButton, styled} from "@mui/material";

export type ModalTransitionType = 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven';

interface Modal {
    isOpen: boolean,
    onClose: () => void
}

const Wrapper = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    marginBottom: '5px'
}))

const ModalWithTransition : React.FC<Modal & {
    children? : any,
    type: ModalTransitionType
}>
    = ({children, type, isOpen, onClose}) => {

    const modalContainerClick = (e: any) => {
        onClose();
    }

    return (
        <div className={isOpen ? 'modal-active' : ''}
             onMouseDown={modalContainerClick} >
            <div id="modal-container"
                 onMouseUp={(e => {
                     e.stopPropagation();
                 })}
                 className={isOpen && type ? type : ''}>
                <div className="modal-background">
                    <div className="modal"
                         onMouseUp={(e) =>
                             e.stopPropagation()}
                         onMouseDown={(e) =>
                             e.stopPropagation()}

                         onClick={(e) => {
                            e.stopPropagation();
                         }}>
                        <Wrapper>
                            <IconButton onClick={onClose}>
                                <Close />
                            </IconButton>
                        </Wrapper>
                        <hr style={{ marginBottom: '20px'}}/>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ModalWithTransition;