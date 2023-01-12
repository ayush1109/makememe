import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainComponent from './component/MainComponent';
import MakeMeme from './component/MakeMeme';
import YourMeme from './component/CaptionedMeme';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<MainComponent />} />

        <Route exact path="/memes" element={<MainComponent />} />
        <Route exact path="/makeMeme" element={<MakeMeme />} />
        <Route exact path="/yourMeme" element={<YourMeme />} />
          {/* <Route exact path="/categoryWise" component={CategoryWise} /> */}
          
          <Route path="*" exact={true} render={() => {
            <div>No match</div>
          }}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;