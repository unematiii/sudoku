import { Dispatch, Middleware } from "redux";

import { 
    CREATE_NEW_GAME,
    GameAction,
    selectBoard,
    selectOriginalBoard,
    SET_CELL_VALUE,
    SOLVE_CURRENT_GAME,
} from "../ducks/game";
import { RootState } from "../../core";
import { saveGame } from "../utils";

export const saveGameMiddleware: Middleware<
    {},RootState, Dispatch<GameAction>
> = (store) => (next: Dispatch<GameAction>) => (action: GameAction) => {
    next(action);

    if([CREATE_NEW_GAME, SET_CELL_VALUE, SOLVE_CURRENT_GAME].includes(action.type)) {
        const state = store.getState();
        const board = selectBoard(state);
        const originalBoard = selectOriginalBoard(state);

        saveGame({ board, originalBoard });
    }
};
