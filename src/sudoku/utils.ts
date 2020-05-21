import { cloneDeep } from "lodash-es";
import { createSudokuBoard } from "@spielhalle/sudoku";
import { isValid, isValidField } from "@spielhalle/sudoku/src/validate";
import { solve } from "@spielhalle/sudoku/src/coverboard/solve";

import {
    boardRetainPercentage,
    boardSize,
    boxSize,
    boardStartIndex,
    localStorageKey,
} from "./consts";
import { GameBoard, GameState } from "./types";

const createBoard = () => createSudokuBoard(boardSize, boardRetainPercentage);

export const createGame = () => {
    const board = createBoard();
    return {
        activeCell: null,
        isAutoSolved: false,
        isSolvable: true,
        board: cloneDeep(board),
        originalBoard: cloneDeep(board),
    };
}

export const solveGame = (board: GameBoard) => {
    const solutions = solve(board, boardSize, boxSize);
    return solutions.length && cloneDeep(solutions[0]) || false;
}

export const isGameSolved = (board: GameBoard) => {
    for(let i = boardStartIndex; i < boardSize; i++) {
        for(let j = boardStartIndex; j < boardSize; j++) {
            if(board[j][i] === 0) {
                return false;
            }
        }
    }
    return isValidBoard(board);
}

export const isValidBoard = (board: GameBoard) =>
    isValidField(board, boardSize, boxSize);

export const isCellValid = (board: GameBoard,  column: number, row: number) => 
    isValid(board, row, column, boardSize, boxSize);

export const shouldHighlightCell = (
    activeCellcolumn: number,
    activeCellrow: number,
    cellColumn: number,
    cellRow: number,
) => {
    const subsectionRowStart: number = Math.floor(activeCellrow / boxSize) * boxSize;
    const subsectionRowEnd: number = subsectionRowStart + boxSize;

    const subsectionColumnStart: number = Math.floor(activeCellcolumn / boxSize) * boxSize;
    const subsectionColumnEnd: number = subsectionColumnStart + boxSize;
    
    return cellColumn === activeCellcolumn ||
        cellRow === activeCellrow ||
        ( cellColumn >= subsectionColumnStart&& cellColumn < subsectionColumnEnd  && 
            cellRow >= subsectionRowStart && cellRow < subsectionRowEnd);
}

export const sanitizeInput = (input: string) => {
    const value = Number(input);
    return Number.isInteger(value) && value >= 1 && value <= 9 ? value : 0;
}

export const loadGame = () => {
    const state = window.localStorage.getItem(localStorageKey);
    if (state) {
        return JSON.parse(state) as GameState;
    }
    return null;
}

export const saveGame = (state: GameState) => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(state));
    return state;
}
