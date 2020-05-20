import { combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import { gameReducer } from "../sudoku/ducks/game";

export const rootReducer = combineReducers({
    game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
