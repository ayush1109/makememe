import { CAPTION_MEME, CAPTION_MEME_FAILED, CAPTION_MEME_LOADING } from "./types";
import {baseUrl} from '../data/baseUrl';

import axios from 'axios';

export const memeCaption = (data) => async (dispatch) => {
    dispatch({
        type: CAPTION_MEME_LOADING
    })
    try {
        axios.post(baseUrl + "caption_image", data
        , {
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
        }
        )
        .then(response => {
            console.log(response)
            dispatch({
                type: CAPTION_MEME,
                payload: response.data.data
            })
        })
        .catch(e => {
            console.log(e)

            dispatch({
                type: CAPTION_MEME_FAILED,
                payload: e.message
            })
        })
        
    }
    catch (e) {
        console.log(e)
        dispatch({
            type: CAPTION_MEME_FAILED,
            payload: e.message
        })
    }
}

