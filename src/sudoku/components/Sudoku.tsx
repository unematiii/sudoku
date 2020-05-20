import { Container } from "semantic-ui-react";
import React, { forwardRef, Ref, useMemo } from "react";

import { boardSize, boardStartIndex } from "../consts";
import { Tile } from "./Tile";
import { withDynamicFontSize } from "../../utils";

import styles from "./Sudoku.css";


const createGrid = (boardSize: number) => {
    const tiles = [];
    for(let i = boardStartIndex; i < boardSize; i++) {
        for(let j = boardStartIndex; j < boardSize; j++) {
            tiles.push(<Tile key={`${i}_${j}`} column={j} row={i} />);
        }
    }
    return tiles;
}

interface SudokuBoardProps {
    style?: React.CSSProperties;
}

const SudokuBoard: React.FC<SudokuBoardProps> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
    const board = useMemo(() => createGrid(boardSize), []);
    return <Container>
        <div className={styles.board} ref={ref} {...props}>
            <div className={styles.grid}>
                {board}
            </div>
        </div>
    </Container>;
});

export const Sudoku = withDynamicFontSize(SudokuBoard);
