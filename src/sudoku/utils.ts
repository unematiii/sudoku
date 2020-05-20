import { cloneDeep } from "lodash-es";
import { createSudokuBoard } from "@spielhalle/sudoku";
import { isValid, isValidField } from "@spielhalle/sudoku/src/validate";
import { solve } from "@spielhalle/sudoku/src/coverboard/solve";

import { boardRetainPercentage, boardSize, boxSize, localStorageKey } from "./consts";
import { BoardState, GameBoard } from "./types";

const createBoard = () => createSudokuBoard(boardSize, boardRetainPercentage);

export const createGame: () => BoardState = () => {
    const board = createBoard();
    const state = {
        board: cloneDeep(board),
        originalBoard: cloneDeep(board),
    };
    saveGame(state);
    return state;
}

export const solveGame = (board: GameBoard) =>
    cloneDeep(solve(board, boardSize, boxSize)[0]);

export const isValidBoard = (board: GameBoard) =>
    isValidField(board, boardSize, boxSize);

export const isCellValid = (board: GameBoard,  column: number, row: number) => 
    isValid(board, row, column, boardSize, boxSize);

export const sanitizeInput = (input: string) => {
    const value = Number(input);
    return Number.isInteger(value) && value >= 1 && value <= 9 ? value : 0;
}

export const loadGame = () => {
    const state = window.localStorage.getItem(localStorageKey);
    if (state) {
        return JSON.parse(state) as BoardState;
    }
    return null;
}
export const saveGame = (state: BoardState) => 
    window.localStorage.setItem(localStorageKey, JSON.stringify(state));
