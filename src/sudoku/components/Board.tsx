import React, { forwardRef, Ref } from "react";

import { boardSize, boardStartIndex } from "../consts";
import { Tile } from "./Tile";
import { withDynamicFontSize } from "../../utils";


import styles from "./Board.css";


const createGrid = (boardSize: number) => {
    const tiles = [];
    for(let i = boardStartIndex; i < boardSize; i++) {
        for(let j = boardStartIndex; j < boardSize; j++) {
            tiles.push(<Tile key={`${i}_${j}`} column={j} row={i} />);
        }
    }
    return tiles;
}

interface BoardComponentProps {
    style?: React.CSSProperties;
}

const BoardComponent: React.FC<BoardComponentProps> = forwardRef((props, ref: Ref<HTMLDivElement>) => (
    <div className={styles.board} ref={ref} {...props}>
        <div className={styles.grid}>
            {createGrid(boardSize)}
        </div>
    </div>
));


export const Board = withDynamicFontSize(BoardComponent);

