import { createStructuredSelector } from "reselect";

import { ActiveCell, BoardCell, BoardState, GameBoard } from "../types";
import { createGame, isCellValid, loadGame, sanitizeInput, saveGame } from "../utils";
import { RootState } from "../../core";

const CREATE_NEW_GAME = 'CREATE_NEW_GAME';
const SET_ACTIVE_CELL = 'SET_ACTIVE_CELL';
const CLEAR_ACTIVE_CELL = 'CLEAR_ACTIVE_CELL';
const SET_CELL_VALUE = 'SET_CELL_VALUE';

interface CreateNewGameAction {
    type: typeof CREATE_NEW_GAME;
    payload: GameBoard;
}

export function createNewGame(board: GameBoard): CreateNewGameAction {
    return {
        type: CREATE_NEW_GAME,
        payload: board,
    };
}

interface SetActiveCellAction {
    type: typeof SET_ACTIVE_CELL;
    payload: ActiveCell;
}

export function setActiveCell(column: number, row: number): SetActiveCellAction {
    return {
        type: SET_ACTIVE_CELL,
        payload: [column, row],
    };
}

interface ClearActiveCellAction {
    type: typeof CLEAR_ACTIVE_CELL;
}

export function clearActiveCell(): ClearActiveCellAction {
    return { type: CLEAR_ACTIVE_CELL };
}

interface SetCellValueAction {
    type: typeof SET_CELL_VALUE;
    payload: {
        column: number;
        row: number;
        value: string;
    };
}

export function setCellValue(column: number, row: number, value: string): SetCellValueAction {
    return {
        type: SET_CELL_VALUE,
        payload: {
            column,
            row,
            value,
        },
    };
}

interface GameState extends BoardState {
    activeCell: null | ActiveCell;
}

const initialBoard = loadGame() || createGame();
const initialState: GameState = {
    activeCell: null,
    ...initialBoard,
};

type GameAction =
    CreateNewGameAction |
    SetActiveCellAction |
    ClearActiveCellAction |
    SetCellValueAction;

export function gameReducer(state = initialState, action: GameAction): GameState {
    switch (action.type) {
        case CREATE_NEW_GAME:
            {
                const boardState = createGame();
                return {
                    ...state,
                    ...boardState,
                };
            }
        case SET_ACTIVE_CELL:
            return {
                ...state,
                activeCell: action.payload,
            };
        case CLEAR_ACTIVE_CELL:
            return {
                ...state,
                activeCell: null,
            };
        case SET_CELL_VALUE:
            {
                const { board, originalBoard } = state;
                const { column, row, value } = action.payload;

                const newValue = sanitizeInput(value);
                const newRow = [
                    ...board[row].slice(0, column),
                    newValue,
                    ...board[row].slice(column + 1)
                ];
                const newBoard = [
                    ...board.slice(0, row),
                    newRow,
                    ...board.slice(row + 1),
                ];

                saveGame({ board: newBoard, originalBoard });

                return {
                    ...state,
                    board: newBoard,
                };
            }
        default:
            return state;
    }
}

function selectGameState(state: RootState): GameState {
    return state.game;
}

function selectBoard(state: RootState): GameBoard {
    return selectGameState(state).board;
}

function selectOriginalBoard(state: RootState): GameBoard {
    return selectGameState(state).originalBoard;
}

function selectActiveCell(state: RootState): ActiveCell | null {
    return selectGameState(state).activeCell;
}

const selectIsActiveCell = (column: number, row: number) => (state: RootState): boolean => {
    const activeCell = selectActiveCell(state);
    return activeCell ? activeCell[0] === column && activeCell[1] === row : false;
}

const selectCellValue = (column: number, row: number) => (state: RootState): number => {
    return selectBoard(state)[row][column];
}

const selectOriginalCellValue = (column: number, row: number) => (state: RootState): number => {
    return selectOriginalBoard(state)[row][column];
}

const selectIsEditable = (column: number, row: number) => (state: RootState): boolean => {
    return selectOriginalCellValue(column, row)(state) === 0
}

const selectIsValidCell = (column: number, row: number) => (state: RootState): boolean => {
    return isCellValid(selectBoard(state), column, row);
}

export const makeCellStateSelector = (column: number, row: number) =>
    createStructuredSelector<RootState, BoardCell>({
        isActive: selectIsActiveCell(column, row),
        isEditable: selectIsEditable(column, row),
        isValid: selectIsValidCell(column, row),
        value: selectCellValue(column, row),
    });