import React from "react";

import { MenuBar } from "./MenuBar";
import { MessageDialog } from "./MessageDialog"
import { Sudoku } from "../../sudoku";

import styles from "./Home.css";

export const Home = () => (
    <div className={styles.container}>
        <MenuBar />
        <Sudoku />
        <MessageDialog />
    </div>
);
