import React, { createRef, useCallback, useMemo, useLayoutEffect } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";

import { boardStartIndex } from "../consts";
import { 
    clearActiveCell,
    makeCellStateSelector,
    setActiveCell,
    setCellValue,
} from "../ducks/game";
import { sanitizeInput } from "../utils";
import { useTypedSelector } from "../../core";

import styles from "./Tile.css";


interface TileProps {
    column: number;
    row: number;
}

export const Tile: React.FC<TileProps> = ({ column, row }) => {
    const inputRef = createRef<HTMLInputElement>();

    const selectCellState = useMemo(() => makeCellStateSelector(column, row), []);
    const cellState = useTypedSelector(selectCellState);

    const { 
        isActive,
        isEditable,
        isHighlighted,
        isValid,
        isValueHighlighted,
        value
    } = cellState;

    const cn = classNames(styles.tile, {
        [styles.active]: isActive,
        [styles.highlighted]: isHighlighted,
        [styles.invalid]: !isValid,
        [styles.predefined]: !isEditable,
        [styles.valueHighlighted]: isValueHighlighted,
    });

    const props = {
        ... isEditable ? {} : { disabled: true },
        value: value === boardStartIndex ? '' : value,
    };

    const dispatch = useDispatch();

    const onClick = useCallback(() => dispatch(setActiveCell(column, row)), []);
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setCellValue(column, row, sanitizeInput(e.target.value.slice(-1)))), []);

    const onFocus = useCallback(() => dispatch(setActiveCell(column, row)), []);
    const onBlur = useCallback(() => dispatch(clearActiveCell()), []);

    // Trigger input focus if state is restored from localStorage
    useLayoutEffect(() => {
        if (isActive && inputRef.current && inputRef.current !== document.activeElement) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    return (
        <div className={cn} onClick={onClick}>
            <input
                inputMode='numeric'
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={onChange}
                pattern='[1-9]'
                min={1}
                max={9}
                step={1}
                ref={inputRef}
                {...props} 
            />
        </div>
    );
}
