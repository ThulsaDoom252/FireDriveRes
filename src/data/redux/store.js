import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth-reducer"
import mediaSlice from "./media-reducer"
import fireDriveSlice from "./fireDrive-reducer";
import paginatorSlice from "./paginator-reducer"


const rootReducer = combineReducers({
    auth: authSlice,
    media: mediaSlice,
    basic: fireDriveSlice,
    paginator: paginatorSlice,
})

export const store = configureStore({
    reducer: rootReducer
})
