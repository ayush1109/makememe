import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from './loader/Loading';

const YourMeme = (props) => {
    console.log(props)
    if(props.captionMeme.isLoading) 
    return (
        <Loader />
    );
    else
        return (
            <div className="container">
                <div> 
                    <h1>Congrats! You have successfully created your meme.</h1>
                <img
                    src={props.captionMeme.data.url}
                    className='image-makeMame'
                />
                </div>

                <div>
                    <a href={props.captionMeme.data.page_url} target="_blank"><h4>Visit ImgFlip Page to see your meme</h4></a>
                </div>

            </div>
        );
}


const mapStateToProps = (state) => {
    return { captionMeme: state.captionMeme };
};

export default connect(mapStateToProps, {
})(YourMeme);