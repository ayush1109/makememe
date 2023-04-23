import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Loader from './loader/Loading';
import * as JimpObj from 'jimp';

const YourMeme = (props) => {
    if(props.captionMeme.isLoading) 
    return (
        <Loader />
    );
    else 
        return (
            <div className="container">
                <div> 
                    <h1>Congrats! You have successfully created your meme.</h1>
                    <h6></h6>
                <img
                    src={props.captionMeme.data.url}
                    className='image-makeMame'
                />
                </div>
            </div>
        );
    }

const mapStateToProps = (state) => {
    return { captionMeme: state.captionMeme };
};

export default connect(mapStateToProps, {
})(YourMeme);