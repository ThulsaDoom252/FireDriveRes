import {createSlice} from "@reduxjs/toolkit";

const paginatorSlice = createSlice({
    name: 'paginator-slice',
    initialState: {
        currentPage: 1,
        totalPages: 1,
        mediaPerPage: 6,
        firstMediaIndex: 0,
        lastMediaIndex: 6,
    },
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setMediaPerPage(state, action) {
            state.mediaPerPage = action.payload > 0 && action.payload
            !== '' ? action.payload : void 0
        },
        setFirstMediaIndex(state, action) {
            state.firstMediaIndex = action.payload
        },
        setLastMediaIndex(state, action) {
            state.lastMediaIndex = action.payload
        },
        setTotalPages(state, action) {
            state.totalPages = action.payload
        },

    }
})

export default paginatorSlice.reducer

export const {
    setCurrentPage,
    setMediaPerPage,
    setFirstMediaIndex,
    setTotalPages,
    setLastMediaIndex,
} = paginatorSlice.actions

