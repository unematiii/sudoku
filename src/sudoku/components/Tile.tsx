import classNames from "classnames";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";

import { boardStartIndex } from "../consts";
import { 
    clearActiveCell,
    makeCellStateSelector,
    setActiveCell,
    setCellValue,
} from "../ducks/game";
import { useTypedSelector } from "../../core/rootReducer";

import styles from "./Tile.css";


interface TileProps {
    column: number;
    row: number;
}

export const Tile: React.FC<TileProps> = ({ column, row }) => {
    const selectCellState = useMemo(() => makeCellStateSelector(column, row), []);
    const cellState = useTypedSelector((state) => selectCellState(state));

    const { isActive, isEditable, isValid, value } = cellState;

    const cn = classNames(styles.tile, {
        [styles.active]: isActive,
        [styles.invalid]: !isValid,
        [styles.predefined]: !isEditable,
    });

    const props = {
        ... isEditable ? {} : { disabled: true },
        value: value === boardStartIndex ? '' : value,
    };

    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(setActiveCell(column, row));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCellValue(column, row, e.target.value.slice(-1)));
    };

    const onFocus = () => {
        dispatch(setActiveCell(column, row));
    };

    const onBlur = () => {
        dispatch(clearActiveCell());
    };

    return <div className={cn} onClick={onClick}>
        <input
            inputMode='numeric'
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            pattern='[1-9]'
            min={1}
            max={9}
            step={1}
            {...props} 
        />
    </div>;
}
