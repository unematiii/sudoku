
/**
 * [column, row]
 */
export type ActiveCell = [number, number];

export interface BoardCell {
    isActive: boolean;
    isEditable: boolean;
    isHighlighted: boolean;
    isValid: boolean;
    isValueHighlighted: boolean;
    value: number;
}

/**
 * [column, row, preValue]
 */
export type GameHistoryEntry = [number, number, number];
export type GameHistory = GameHistoryEntry[]; 

export interface GameState {
    activeCell: null | ActiveCell;
    board: GameBoard;
    history: GameHistory;
    isAutoSolved: boolean,
    isSolvable: boolean;
    originalBoard: GameBoard;
}

export type GameBoard = number[][];
