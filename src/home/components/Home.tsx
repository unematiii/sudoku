import React from "react";
import { createSudokuBoard } from "@spielhalle/sudoku";
import { BOARD_START_IDX } from "@spielhalle/sudoku/src/constants";
import { isValid } from "@spielhalle/sudoku/src/validate";

import { MenuBar } from "./MenuBar";
import { Sudoku } from "../../sudoku";


export const Home = () => {
    const board = createSudokuBoard(9, 0.5);
    console.log('board', board, 'isValid', isValid(board, BOARD_START_IDX, BOARD_START_IDX, 9, 3));

    return <>
        <MenuBar />
        <Sudoku />
    </>;
}
    
