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
import { GameBoard, GameHistory, GameHistoryEntry, GameState } from "./types";

const createBoard = () => createSudokuBoard(boardSize, boardRetainPercentage);

export const createGame: () => GameState = () => {
    const board = createBoard();
    return {
        activeCell: null,
        history: [],
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

export function isGameHistoryEntries(entry: GameHistoryEntry | GameHistoryEntry[]) : entry is GameHistoryEntry[] {
    return Array.isArray(entry) && entry.length > 0 && Array.isArray(entry[0]);
}

export const updateBoard = (board: GameBoard, column: number, row: number, value: number): GameBoard => {
    const newRow = [
        ...board[row].slice(0, column),
        value,
        ...board[row].slice(column + 1)
    ];
    return [
        ...board.slice(0, row),
        newRow,
        ...board.slice(row + 1),
    ];
}

export const shouldHighlightCell = (
    activeCellcolumn: number,
    activeCellrow: number,
    cellColumn: number,
    cellRow: number,
) => {
    const subsectionRowStart = Math.floor(activeCellrow / boxSize) * boxSize;
    const subsectionRowEnd = subsectionRowStart + boxSize;

    const subsectionColumnStart = Math.floor(activeCellcolumn / boxSize) * boxSize;
    const subsectionColumnEnd = subsectionColumnStart + boxSize;
    
    return cellColumn === activeCellcolumn ||
        cellRow === activeCellrow ||
        (cellColumn >= subsectionColumnStart&& cellColumn < subsectionColumnEnd  && 
            cellRow >= subsectionRowStart && cellRow < subsectionRowEnd);
}

export const sanitizeInput = (input: string) => {
    const value = Number(input);
    return Number.isInteger(value) && value >= 1 && value <= 9 ? value : 0;
}

export const updateHistoryFromSolvedGame = 
    (board: GameBoard, solvedGame: GameBoard, history: GameHistory): GameHistory  => {
        const entry: GameHistoryEntry[] = [];
        for(let i = boardStartIndex; i < boardSize; i++) {
            for(let j = boardStartIndex; j < boardSize; j++) {
                if(board[i][j] !== solvedGame[i][j]) {
                    entry.push([j, i, board[i][j]]);
                }
            }
        }

        return [...history, entry];
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
