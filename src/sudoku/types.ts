export type ActiveCell = [number, number];

export interface BoardCell {
    isActive: boolean;
    isEditable: boolean;
    isHighlighted: boolean;
    isValid: boolean;
    value: number;
}

export interface BoardState {
    board: GameBoard;
    originalBoard: GameBoard;
}

export type GameBoard = number[][];
