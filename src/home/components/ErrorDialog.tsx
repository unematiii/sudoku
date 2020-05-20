import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { selectIsGameUnsolvable } from "../../sudoku";
import { useTypedSelector } from "../../core";

import styles from "./ErrorDialog.css";

export const ErrorDialog = () => {
    const open = useTypedSelector(selectIsGameUnsolvable);
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const closeDialog = () => setIsOpen(false);

    return (
        <Modal basic size='small' open={isOpen} key={Math.random()}>
            <Header textAlign='center'>
                <Icon name='close' />This game is unsolvable!
            </Header>
            <Modal.Actions className={styles.actions}>
                <Button color='green' inverted onClick={closeDialog}>
                    <Icon name='checkmark' />OK
                </Button>
            </Modal.Actions>
        </Modal>
    );
}
