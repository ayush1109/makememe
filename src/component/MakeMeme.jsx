import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { memeCaption } from '../redux/actions/captionMemeAction'
import _ from 'lodash';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';

// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const theme = createTheme();

function RenderForm({ id, memeCaption, name }) {
    let form;
    const navigate = useNavigate();
    const fontList = [
        {
            value: 'impact',
            label: 'Impact',
        },
        {
            value: 'arial',
            label: 'Arial',
        }
    ]
    const handleSubmit = (event) => {
        form = event.currentTarget;
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const bodyData = {
            template_id: id,
            text0: data.get('topText'),
            text1: data.get('bottomText'),
            font: data.get('font'),
            max_font_size: data.get('max_font_size'),
            username: "memes_creater",
            password: "memes_creater"

        };

        memeCaption(bodyData);

        navigate("/yourMeme", {
            state: {
                name: name
            }
        });

    };

    return (
        <>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Caption your Meme
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="topText"
                                    required
                                    fullWidth
                                    id="topText"
                                    label="Text on the meme"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="bottomText"
                                    label="Other Text on the meme"
                                    name="bottomText"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    id="font"
                                    label="Font"
                                    name="font"
                                    defaultValue="impact"
                                    helperText="The font family to use for the text. Current options are impact and arial. Defaults to impact."
                                >
                                    {fontList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type={"number"}
                                    name="max_font_size"
                                    label="Max Font Size"
                                    id="max_font_size"
                                    helperText="Maximum font size in pixels. Defaults to 50px"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
         </>
    );
}


const MakeMeme = (props) => {

    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <>
            <div className='App'>
            <div className='text'>{searchParams.get("name")}</div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                <img
                    key={searchParams.get("id")}
                    src={searchParams.get("src")}
                    alt={searchParams.get("name")}
                    className='image-makeMame'
                />
                </Grid>
                <Grid item sx={12} md={6}>
                <RenderForm id={searchParams.get("id")} memeCaption={props.memeCaption} name={searchParams.get('name')} />
                    </Grid> 
            </Grid>
                
            </div>
        </>
    );
    
}

const mapStateToProps = (state) => {
    return { captionMeme: state.captionMeme };
};

export default connect(mapStateToProps, {
    memeCaption
})(MakeMeme);
