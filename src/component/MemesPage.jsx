import React, { useState } from 'react';
import { connect } from 'react-redux';
import Loader from './loader/Loading';
import { getMemes } from '../redux/actions/getMemesAction'
import _ from 'lodash';
import Masonry from 'react-responsive-masonry';
import { createSearchParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ReactSearchBox from "react-search-box";
import { Grid, IconButton } from '@mui/material';


const data = [
    {
        key: "john",
        value: "John Doe",
    },
    {
        key: "jane",
        value: "Jane Doe",
    }
];

// const RenderSearchBar = (data) => {
//     console.log(data)
//     return (
        
//     );
// }

function searchMeme(memeList, name) {
    if(memeList.length > 0) {
        memeList.map(meme => {
            if(meme.name.includes(name)) {
                console.log('matched')
            }
        })
    } else {
        alert('No meem to search');
    }
}

const RenderMemes = ({ memeList, transcript }) => { 

  

    // if (isLoading) {
    //     return (
    //         <Loader />
    //     );
    // }
    // else if (!_.isEmpty(err)) {
    //     return (
    //         <div>Error : {err.name}<br></br>
    //             Message : {err.code}</div>
    //     );
    // }
    // else {
        return (
            <div className="memes-div container">
                {/* <RenderSearchBar data={memeList} /> */}
                {memeList.length > 0 ?
                                <Grid container spacing={0}>
                        {memeList.map((meme, i) => {
                            if (transcript.toUpperCase() == meme.name.toUpperCase()) {
                                console.log('matched');
                                document.getElementById(meme.id).click();
                            }
                            return (
                                <>
                                    <Grid item xs={12} md={4}>
                                    <CardContent>
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
                                        </CardContent>
                                    </Grid>
                                </>

                            )
                        }
                        )}
</Grid>
                    : <div>Error in fetching memes</div>}
            </div>
        )
    }
// }


const MemesPage = (props) => {
    const [memeData, setMemeData] = useState([]);

    const [filterData, setFilterData] = useState([]);
    const [query, setQuery] = useState('');


    React.useEffect(() => {
        const getData = async() => {
            const reqData = await fetch('https://api.imgflip.com/get_memes')
            const resData = await reqData.json();
            console.log(resData.data.memes);
            setMemeData(resData.data.memes);
            setFilterData(resData.data.memes)
        }
        // props.getMemes();
        getData();
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

console.log(transcript)
    function handleSearch(data) {
        if(data.length > 0) {
            const searchdata = memeData.filter( item => item.name.toLowerCase().includes(data))
            setMemeData(searchdata)
        } else {
            setMemeData(filterData)
        }
        setQuery(data)
    }



    return (
        <>
            <div className='App'>
                <h1>Click on any template or use Voice assistant feature to create your own meme</h1>
                <div>
                    <p>Microphone: {listening ? 'on' : 'off'}</p>
                    {/* <Button onClick={SpeechRecognition.startListening}
                        variant="outlined" color="success" sx={{ mt: 3, mb: 2 }}>
                        Start </Button>
                    <Button onClick={SpeechRecognition.stopListening}
                        variant="outlined" color="error" sx={{ mt: 3, mb: 2 }}>
                        Stop </Button>
                    <Button onClick={resetTranscript}
                        variant="outlined" color="warning" sx={{ mt: 3, mb: 2 }}>
                        Reset </Button> */}
                    <p>{transcript}</p>
                </div>
                <div class="search">
      <input type="text" class="searchTerm" placeholder="What are you looking for?" 
      value={query}
      onChange={(e) => {
          handleSearch(e.target.value)
      }}
      />
      {listening ? <IconButton onClick={SpeechRecognition.stopListening} class="searchButton">
        <MicOffIcon />
        </IconButton> : 
        <IconButton onClick={SpeechRecognition.startListening} class="searchButton">
        <MicIcon />
        </IconButton>
        }
   </div>
                
                    <RenderMemes 
                    // isLoading={props.memes.isLoading}
                        memeList={memeData}
                        // err={props.memes.err}
                        transcript={transcript}
                    />
            </div>
        </>
    );
}


const mapStateToProps = (state) => {
    return { memes: state.memes };
};

// export default connect(mapStateToProps, {
//     getMemes
// })(MemesPage);

export default MemesPage;