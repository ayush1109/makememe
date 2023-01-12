import {
    GET_MEMES, GET_MEMES_FAILED, GET_MEMES_LOADING,
} from "../actions/types";

const initialState = { isLoading: true, data: [], err: {} };

export const memes = (state = initialState, action) => {
    switch (action.type) {

        case GET_MEMES_LOADING:
            return {
                ...state
            }

        case GET_MEMES:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };


        case GET_MEMES_FAILED:
            return {
                data: [],
                isLoading: false,
                err: action.payload
            }

        default:
            return state;
    }
};
