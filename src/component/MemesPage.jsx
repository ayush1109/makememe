import React, { useState } from 'react';
import { connect } from 'react-redux';
import Loader from './loader/Loading';
import { getMemes } from '../redux/actions/getMemesAction'
import _ from 'lodash';
import Masonry from 'react-responsive-masonry';
import { createSearchParams, Link } from 'react-router-dom';



const RenderMemes = ({ isLoading, memeList, err }) => {
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
                        {memeList.map((meme, i) => (
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
                                    />

                                </Link>
                                <div className='text'>{meme.name}</div>
                            </>

                        ))}
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



    return (
        <>
            <div className='App'>
                <h1>Click on any template to create your own meme</h1>
                <RenderMemes isLoading={props.memes.isLoading}
                    memeList={props.memes.data}
                    err={props.memes.err}
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