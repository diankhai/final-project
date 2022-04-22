import React from "react";
import "./styles/Dashboard.css";
import Header from "./elements/Header.tsx";
import axios from "axios";
import { ProfileCard, PlaylistCard } from "./elements/UserInfo.tsx";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import store from "../redux/store";

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

class Dashboard extends React.Component {
    state = {user:{followers:{total:''}},
             avatarPic:'',
             playlist:{}};
    
    UserProfile = (accessToken) => {
        axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept : 'application/json'
          },
        })
        .then(response => {
            this.setState({user:response.data});
        });
    }

    UserPlaylist = (accessToken) => {
        axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept : 'application/json'
          },
        })
        .then(response => {
            this.setState({playlist:response.data.items});
            // console.log(response.data.items);
        });
    };

    componentDidMount() {
        const accessToken = store.getState().value;
        this.UserProfile(accessToken);
        this.UserPlaylist(accessToken);
    };

    render(){
        if (this.state.user.images){
            this.setState({avatarPic:this.state.user.images[0].url});
        };
        const url="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png";
        const navigateTo = '/create-playlist'+window.location.hash;
    return(
        <>
            <Header logoURL={url} />
            <div className="wrapper">
                <ProfileCard imgURL={this.state.avatarPic} userName={this.state.user.display_name} userFolls={this.state.user.followers.total} />
                <div className="playlistContainer">
                    <h3>Your Playlist</h3>
                    <Link to={navigateTo}>
                        <Button variant="outlined" sx={styles} className="btnCreate">Create New Playlist</Button>
                    </Link>
                </div>
                <PlaylistCard data={this.state.playlist} />
            </div>
        </>
    )}
};

export default Dashboard;