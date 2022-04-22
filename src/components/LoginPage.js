import React from "react";
import {Helmet} from "react-helmet";
import Button from "@mui/material/Button";
import "./styles/Login.css";

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

const authEndpoint = process.env.REACT_APP_AUTH;
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirUri = process.env.REACT_APP_REDIR;
const scope = "playlist-modify-private";

class LoginPage extends React.Component {
    handleURL = () => {
        window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirUri}&scope=${scope}&response_type=token&show_dialog=true`;
    };
    render(){
    return(
        <>
        <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </Helmet>
        <div className="main">
            <div className="wrapper-login">
                <img className="logo" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="" />
                <br />
                <h5>Click the button below to Login!</h5>
                <Button variant="outlined" sx={styles} onClick={this.handleURL}>Authorization</Button>
            </div>
        </div>
        </>
    )}
};

export default LoginPage;