import React from "react";

import { MenuBar } from "./MenuBar";
import { MessageDialog } from "./MessageDialog"
import { Sudoku } from "../../sudoku";

export const Home = () => 
    <>
        <MenuBar />
        <Sudoku />
        <MessageDialog />
    </>;
