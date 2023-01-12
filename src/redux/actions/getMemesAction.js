import { GET_MEMES, GET_MEMES_FAILED, GET_MEMES_LOADING } from "./types";
import {baseUrl} from '../data/baseUrl';

import axios from 'axios';

export const getMemes = () => async (dispatch) => {
    dispatch({
        type: GET_MEMES_LOADING
    })
    try {
        axios.get(baseUrl + "get_memes")
        .then(response => {
            dispatch({
                type: GET_MEMES,
                payload: response.data.data.memes
            })
        })
        .catch(e => {
            dispatch({
                type: GET_MEMES_FAILED,
                payload: e.message
            })
        })
        
    }
    catch (e) {
        dispatch({
            type: GET_MEMES_FAILED,
            payload: e.message
        })
    }
}

