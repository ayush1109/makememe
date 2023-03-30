import React, { useState } from 'react';
import { connect } from 'react-redux';
import Loader from './loader/Loading';
import { getMemes } from '../redux/actions/getMemesAction'
import _ from 'lodash';
import Masonry from 'react-responsive-masonry';
import { createSearchParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const RenderMemes = ({ isLoading, memeList, err, transcript }) => {
    if (isLoading) {
        return (
            <Loader />
        );
    }
    else if (!_.isEmpty(err)) {
        return (
            <div>Error : {err.name}<br></br>
                Message : {err.code}</div>
        );
    }
    else {
        return (
            <div className="memes-div container">
                {memeList.length > 0 ?
                    <Masonry gutter="15" columnsCount={4}>
                        {memeList.map((meme, i) => {
                            if (transcript.toUpperCase() == meme.name.toUpperCase()) {
                                console.log('matched');
                                document.getElementById(meme.id).click();
                            }
                            return (
                                <>
                                    <Link to={{
                                        pathname: "/makeMeme",
                                        search: createSearchParams({
                                            id: meme.id,
                                            src: meme.url,
                                            name: meme.name
                                        }).toString()
                                    }}>
                                        <img
                                            key={i}
                                            src={meme.url}
                                            alt={meme.name}
                                            className='image'
                                            id={meme.id}
                                        />

                                    </Link>
                                    <div className='text'>{meme.name}</div>
                                </>

                            )
                        }
                        )}
                    </Masonry>

                    : <div>Error in fetching memes</div>}
            </div>
        )
    }
}


const MemesPage = (props) => {

    React.useEffect(() => {
        props.getMemes();
        console.log(props.memes)
    }, []);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    //   function stopListening() {
    //     SpeechRecognition.stopListening();
    //     setMicUsed(true);
    //     // executeAction(transcript);
    //   }



    return (
        <>
            <div className='App'>
                <h1>Click on any template or use Voice assistant feature to create your own meme</h1>
                <div>
                    <p>Microphone: {listening ? 'on' : 'off'}</p>
                    <Button onClick={SpeechRecognition.startListening}
                        variant="outlined" color="success" sx={{ mt: 3, mb: 2 }}>
                        Start </Button>
                    <Button onClick={SpeechRecognition.stopListening}
                        variant="outlined" color="error" sx={{ mt: 3, mb: 2 }}>
                        Stop </Button>
                    <Button onClick={resetTranscript}
                        variant="outlined" color="warning" sx={{ mt: 3, mb: 2 }}>
                        Reset </Button>
                    <p>{transcript}</p>
                </div>
                <RenderMemes isLoading={props.memes.isLoading}
                    memeList={props.memes.data}
                    err={props.memes.err}
                    transcript={transcript}
                />
            </div>
        </>
    );
}


const mapStateToProps = (state) => {
    return { memes: state.memes };
};

export default connect(mapStateToProps, {
    getMemes
})(MemesPage);