import React from "react";

import { ErrorDialog } from "./ErrorDialog";
import { MenuBar } from "./MenuBar";
import { Sudoku } from "../../sudoku";

export const Home = () => 
    <>
        <MenuBar />
        <Sudoku />
        <ErrorDialog />
    </>;
