import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { selectIsGameUnsolvable, selectIsGameSolved } from "../../sudoku";
import { useTypedSelector } from "../../core";

import styles from "./MessageDialog.css";


export const MessageDialog = () => {
    const isUnsolvable = useTypedSelector(selectIsGameUnsolvable);
    const isGameSolved = useTypedSelector(selectIsGameSolved);
    const showMessage = isUnsolvable || isGameSolved;

    const [isOpen, setIsOpen] = useState(showMessage);

    useEffect(() => {
        setIsOpen(showMessage);
    }, [showMessage]);

    const title = isUnsolvable ? 
        'This game is unsolvable!' : 
        'Game solved! Good job!';
    const icon = isUnsolvable ? 'close' : 'checkmark box';

    const closeDialog = () => setIsOpen(false);

    return (
        <Modal basic size='small' open={isOpen}>
            <Header textAlign='center' as='h2'>
                <Icon name={icon} />{title}
            </Header>
            <Modal.Actions className={styles.actions}>
                <Button color='green' inverted onClick={closeDialog}>
                    <Icon name='check' />OK
                </Button>
            </Modal.Actions>
        </Modal>
    );
}
