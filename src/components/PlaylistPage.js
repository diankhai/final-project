import React from "react";
import Header from "./elements/Header.tsx";
import "./styles/Playlist.css";
import {TrackURI, Tracklist} from './elements/Tracks.tsx';
import axios from "axios";
import store from "../redux/store";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

const styles = {
  "&.MuiButton-root": {
    color: "white",
    border: "1px green solid",
    borderRadius: 8
  },
  "&.MuiButton-outlined": {
    backgroundColor: "green"
  }
};

class PlaylistPage extends React.Component {
    state = {
        title:'',
        desc:'',
        artistName:'',
        clientId:process.env.REACT_APP_CLIENT_ID,
        accessToken:'',
        tracks:''
      }

    componentDidMount() {
        const token = store.getState().value;
        this.setState({accessToken:token});
    };

    submit=()=>{
       const headers= {
         'Authorization': 'Bearer ' + this.state.accessToken
       }
       return fetch('https://api.spotify.com/v1/me', {headers: headers})
       .then(response => response.json())
       .then(jsonResponse => {
         return fetch(`https://api.spotify.com/v1/users/${jsonResponse.id}/playlists`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ 
            name: this.state.title,
            description:this.state.desc,
            public : false }),
        }) })
       .then((response) => response.json())
       .then((jsonResponse) => {
         const playlistID = jsonResponse.id;
         const tracks=TrackURI();
         fetch(
           `https://api.spotify.com/v1/users/${this.state.clientId}/playlists/${playlistID}/tracks`,
           {
             method: 'POST',
             headers: headers,
             body: JSON.stringify({ uris: tracks }),
           }
         );
         alert("Creating Playlist Success!");
       });
     }
 
     titleOnChange=(event)=>{
       this.setState({title: event.target.value});
     }
 
     descOnChange=(event)=>{
       this.setState({desc: event.target.value});
     }

    Search = () => {
        axios.get(`https://api.spotify.com/v1/search?q=artist:${this.state.artistName}&type=track&limit=20`, {headers: {
            Authorization: `Bearer ${this.state.accessToken}`
        }
        }).then(response => {
          console.log(response);
          let lists = response.data.tracks.items.map(track => 
            ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
              cover:track.album.images[0].url
            })
          );
          this.setState({tracks:lists});
          return lists;
        })
      };

     handleChange = (event) => {
        this.setState({artistName: event.target.value});
     }
 
    render(){
        const url="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png";
        const navigateTo = '/dashboard'+window.location.hash;
        return <>
        <Header logoURL={url} />
            <div className="wrapper">
                <div className="buttonForm">
                  <Link to={navigateTo}>
                      <Button variant="outlined" sx={styles}>Back to Dashboard</Button>
                  </Link>
                </div>
                <div className="playlistForm">
                  <div className="col3">
                    <img src="https://cdn-icons-png.flaticon.com/512/651/651717.png" alt="" />
                  </div>
                  <div className="col4">
                    <form useref="form" onSubmit={this.submit}>
                        <TextField fullWidth color="success" label="Playlist Name" variant="outlined" onChange={this.titleOnChange} defaultValue="Type in here..."/>
                        <br/> <br />
                        <TextField fullWidth color="success" onChange={this.descOnChange} label="Description" multiline rows={4} defaultValue="Optional" />
                        <br />
                        <div className="btnSubmit">
                          <Button variant="outlined" sx={styles} type="submit">Submit</Button>
                        </div>
                    </form>
                  </div>
                </div>
                <div className="searchForm">
                  <div className="searchBar">
                    <h3>Lets find something for your playlist!</h3>
                    <form onSubmit={this.Search}> 
                        <input onChange = {this.handleChange} value ={this.state.artistName} placeholder="Type Artist Name..." />
                        <Button variant="outlined" sx={styles} type="submit">Find</Button>
                    </form>
                  </div>
                    <Tracklist data={this.state.tracks} />
                </div>
            </div>
        </>
    }
}

export default PlaylistPage;