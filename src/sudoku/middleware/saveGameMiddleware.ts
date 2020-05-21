import { Dispatch, Middleware } from "redux";

import { GameAction, selectGameState } from "../ducks/game";
import { RootState } from "../../core";
import { saveGame } from "../utils";

export const saveGameMiddleware: 
    Middleware<
        {}, RootState, Dispatch<GameAction>
    > = (store) => (next: Dispatch<GameAction>) => (action: GameAction) => 
    {
        next(action);
        saveGame(selectGameState(store.getState()));
    };
