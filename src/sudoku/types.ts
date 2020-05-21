export type ActiveCell = [number, number];

export interface BoardCell {
    isActive: boolean;
    isEditable: boolean;
    isHighlighted: boolean;
    isValid: boolean;
    isValueHighlighted: boolean;
    value: number;
}

export interface GameState {
    activeCell: null | ActiveCell;
    board: GameBoard;
    isAutoSolved: boolean,
    isSolvable: boolean;
    originalBoard: GameBoard;
}

export type GameBoard = number[][];
