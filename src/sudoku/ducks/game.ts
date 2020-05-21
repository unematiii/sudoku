import { createStructuredSelector } from "reselect";

import { ActiveCell, BoardCell, GameBoard, GameState } from "../types";
import {
    createGame,
    isCellValid,
    isGameSolved,
    isValidBoard,
    loadGame,
    saveGame,
    shouldHighlightCell,
    solveGame,
} from "../utils";
import { RootState } from "../../core";

export const CREATE_NEW_GAME = 'CREATE_NEW_GAME';
export const SET_CELL_VALUE = 'SET_CELL_VALUE';
export const SOLVE_CURRENT_GAME = 'SOLVE_CURRENT_GAME';
const SET_ACTIVE_CELL = 'SET_ACTIVE_CELL';
const CLEAR_ACTIVE_CELL = 'CLEAR_ACTIVE_CELL';

interface CreateNewGameAction {
    type: typeof CREATE_NEW_GAME;
}

export function createNewGame(): CreateNewGameAction {
    return {
        type: CREATE_NEW_GAME,
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
        value: number;
    };
}

export function setCellValue(column: number, row: number, value: number): SetCellValueAction {
    return {
        type: SET_CELL_VALUE,
        payload: {
            column,
            row,
            value,
        },
    };
}

interface SolveCurrentGameAction {
    type: typeof SOLVE_CURRENT_GAME;
}

export function solveCurrentGame(): SolveCurrentGameAction {
    return {
        type: SOLVE_CURRENT_GAME,
    };
}

const initialState: GameState = {
    ... (loadGame() || saveGame(createGame()))
};

export type GameAction =
    CreateNewGameAction |
    SetActiveCellAction |
    ClearActiveCellAction |
    SetCellValueAction |
    SolveCurrentGameAction;

export function gameReducer(state = initialState, action: GameAction): GameState {
    switch (action.type) {
        case CREATE_NEW_GAME:
            return {
                ...createGame(),
            };
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
                const { board } = state;
                const { column, row, value } = action.payload;

                const newRow = [
                    ...board[row].slice(0, column),
                    value,
                    ...board[row].slice(column + 1)
                ];
                const newBoard = [
                    ...board.slice(0, row),
                    newRow,
                    ...board.slice(row + 1),
                ];

                return {
                    ...state,
                    board: newBoard,
                    isAutoSolved: false,
                    isSolvable: true,
                };
            }
        case SOLVE_CURRENT_GAME: 
            {
                const { board } = state;
                const solution = solveGame(board);

                return {
                    ...state,
                    board: solution || board,
                    isAutoSolved: !!solution,
                    isSolvable: !!solution,
                };
            }
        default:
            return state;
    }
}

export const selectGameState = (state: RootState): GameState => state.game;

const selectBoard = (state: RootState): GameBoard =>
    selectGameState(state).board;

const selectOriginalBoard = (state: RootState): GameBoard =>
    selectGameState(state).originalBoard;

const selectActiveCell = (state: RootState): ActiveCell | null =>
    selectGameState(state).activeCell;

const selectIsActiveCell = (column: number, row: number) => (state: RootState): boolean => {
    const activeCell = selectActiveCell(state);
    return activeCell ? activeCell[0] === column && activeCell[1] === row : false;
}

const selectCellValue = (column: number, row: number) => (state: RootState): number =>
    selectBoard(state)[row][column];

const selectOriginalCellValue = (column: number, row: number) => (state: RootState): number =>
    selectOriginalBoard(state)[row][column];

const selectIsEditable = (column: number, row: number) => (state: RootState): boolean => 
    selectOriginalCellValue(column, row)(state) === 0;

const selectIsValidCell = (column: number, row: number) => (state: RootState): boolean =>
    isCellValid(selectBoard(state), column, row);

export const selectIsValidBoard = (state: RootState): boolean =>
    isValidBoard(selectBoard(state));

const selectIsGameAutoSolved = (state: RootState): boolean =>
    selectGameState(state).isAutoSolved;

export const selectIsGameUnsolvable = (state: RootState): boolean =>
    !selectGameState(state).isSolvable;

export const selectIsGameSolved = (state: RootState): boolean =>
    isGameSolved(selectBoard(state)) && !selectIsGameAutoSolved(state);

export const selectIsCellHighlighted = (column: number, row: number) => (state: RootState): boolean => {
    const activeCell = selectActiveCell(state);
    return activeCell !== null && shouldHighlightCell(activeCell[0], activeCell[1], column, row);
}

export const selectIsValueHighlighted = (column: number, row: number) => (state: RootState): boolean => {
    const activeCell = selectActiveCell(state);
    if (!activeCell) {
        return false;
    }
    const activeCellValue = selectCellValue(activeCell[0], activeCell[1])(state);
    return activeCellValue > 0 && selectCellValue(column, row)(state) === activeCellValue;
}

export const makeCellStateSelector = (column: number, row: number) =>
    createStructuredSelector<RootState, BoardCell>({
        isActive: selectIsActiveCell(column, row),
        isEditable: selectIsEditable(column, row),
        isHighlighted: selectIsCellHighlighted(column, row),
        isValid: selectIsValidCell(column, row),
        isValueHighlighted: selectIsValueHighlighted(column, row),
        value: selectCellValue(column, row),
    });
