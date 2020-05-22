import React from "react";
import { Container, Dropdown, Icon, Menu } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import {
    createNewGame,
    selectCanUndo,
    selectIsGameSolved,
    selectIsGameAutoSolved,
    selectIsGameUnsolvable,
    selectIsValidBoard,
    solveCurrentGame,
    undoAction,
    undoAllActions,
} from "../../sudoku";
import { useTypedSelector } from "../../core";

import styles from "./MenuBar.css";


export const MenuBar = () => {
    const dispatch = useDispatch();
    const canUndo = useTypedSelector(selectCanUndo);
    const isBoardValid = useTypedSelector(selectIsValidBoard);
    const isGameUnsolvable = useTypedSelector(selectIsGameUnsolvable);
    const isGameAutoSolved = useTypedSelector(selectIsGameAutoSolved);
    const isGameSolved = useTypedSelector(selectIsGameSolved);
    const canTryReSolve = isBoardValid && !isGameUnsolvable && !isGameAutoSolved && !isGameSolved;

    const onClickNewGame = () => dispatch(createNewGame());
    const onClickSolveGame = () => dispatch(solveCurrentGame());
    const onClickUndo = () => dispatch(undoAction());
    const onClickUndoAll = () => dispatch(undoAllActions());

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
                                <Icon name='pencil' />New Game
                            </Dropdown.Item>
                            <Dropdown.Item disabled={!canTryReSolve} onClick={onClickSolveGame}>
                                <Icon name='flag' />Solve Current
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item disabled={!canUndo} onClick={onClickUndoAll}>
                                <Icon name='redo' />Start Over
                            </Dropdown.Item>
                            <Dropdown.Item disabled={!canUndo} onClick={onClickUndo}>
                                <Icon name='undo' />Undo
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        </Container>
    );
}
