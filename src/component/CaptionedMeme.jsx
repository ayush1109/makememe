import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from './loader/Loading';
import { Button } from '@mui/material';
import { copyImageToClipboard } from 'copy-image-clipboard'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { saveAs } from 'file-saver'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const YourMeme = (props) => {
    const { state } = useLocation();
    useEffect(() => {
        copyImageToClipboard(props.captionMeme.data.url)
        .then(() => {
            setOpenSuccess(true);
        })
        .catch((e) => {
            setOpenError(true);
        })
    }, [props.captionMeme.data.url])

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleClose = () => {
        setOpenError(false);
        setOpenSuccess(false);
    };

    const downloadImage = () => {
        saveAs(props.captionMeme.data.url, state.name) // Put your image url here.
      }


    if (props.captionMeme.isLoading)
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
                <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Image Copied Successfully!!
                    </Alert>
                </Snackbar>

                <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Error in copying Image!!
                    </Alert>
                </Snackbar>
                <Button variant='outlined' color='info' onClick={downloadImage} sx={{m:1.5}}>Download</Button>
            </div>
        );
    }

const mapStateToProps = (state) => {
    return { captionMeme: state.captionMeme };
};

export default connect(mapStateToProps, {
})(YourMeme);