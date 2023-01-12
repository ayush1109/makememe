import { combineReducers } from "redux";
import { memes } from "./getMemesReducer";
import { captionMeme } from "./captionMemeReducer";



export default combineReducers({
   memes,
   captionMeme
});
