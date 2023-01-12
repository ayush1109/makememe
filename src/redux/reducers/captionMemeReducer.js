import {
    CAPTION_MEME, CAPTION_MEME_FAILED, CAPTION_MEME_LOADING,
} from "../actions/types";

const initialState = { isLoading: true, data: {}, err: {} };

export const captionMeme = (state = initialState, action) => {
    switch (action.type) {

        case CAPTION_MEME_LOADING:
            return {
                ...state
            }

        case CAPTION_MEME:
            {
                console.log(state)
            return {
                ...state,
                isLoading: false,
                data: action.payload,
          };
            }


        case CAPTION_MEME_FAILED:
            return {
                data: {},
                isLoading: false,
                err: action.payload
            }

        default:
            return state;
    }
};
