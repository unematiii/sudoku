import React from "react";

import styles from "./Tile.css";

interface TileProps {
    column: number;
    row: number;
}

export const Tile: React.FC<TileProps> = ({ column, row }) => {
    const onClick = () => {
        console.log('column', column, 'row', row);
    };

    return <div className={styles.tile}>
        <input type='number' onClick={onClick} />
    </div>;
}
    
