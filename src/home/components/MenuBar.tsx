import React from "react";
import { Container, Dropdown, Icon, Menu } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import { createNewGame, solveCurrentGame } from "../../sudoku";
import { selectIsValidBoard } from "../../sudoku";
import { useTypedSelector } from "../../core";

import styles from "./MenuBar.css";


export const MenuBar = () => {
    const dispatch = useDispatch();
    const isBoardValid = useTypedSelector(selectIsValidBoard);

    const onClickNewGame = () => dispatch(createNewGame());
    const onClickSolveGame = () => dispatch(solveCurrentGame());

    return (
        <Container className={styles.container}>
            <Menu size='large' secondary>
                <Menu.Item header as='h2' className={styles.logo}>
                    <Icon name='check square outline' />Sudoku 
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Dropdown text='GAME' pointing='top right' className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={onClickNewGame}>
                                <Icon name='redo' />New Game
                            </Dropdown.Item>
                            <Dropdown.Item disabled={!isBoardValid} onClick={onClickSolveGame}>
                                <Icon name='pencil' />Solve Current
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        </Container>
    );
}
