import React, { useState } from "react";
import Button from "@mui/material/Button";

const styles = {
  "&.MuiButton-root": {
    color: "green",
    border: "1px white solid",
    borderRadius: 8,
  },
  "&.MuiButton-outlined": {
    backgroundColor: "white"
  },
};


interface Type {
  data:string;
}
interface Detailtype {
  id: string;
  name: string;
  artist: string;
  album: string;
  uri: string;
  cover: string;
  child_items?: Detailtype[];
}


let arr = [];
const TrackURI = (uri) => {
  if(uri){
    arr.push(uri);
  }else{
    return(arr);
  }
}

const Tracks = ({ song, artist, cover, uri }) => {
  const [label, setLabel] = useState('Select');

  return(
  <div className="track" >
    <img className="track-cover" src={cover} alt={song} />
    <div className="track-details">
      <h6>{song}</h6>
      <h6>{artist}</h6>
        <Button variant="outlined" sx={styles} onClick={() => {
          if (label==='Select'){
            setLabel("Deselect")
            TrackURI(uri);
          }else{
            setLabel("Select")
        }}}>{label}</Button>
    </div>
  </div>
  );
};

class Tracklist extends React.Component<Type> {
    render() {
        let track:string;
        let items = (this.props.data);
        if (items){
         track= (items as any).map((track:Detailtype) => <Tracks  key={track.id} song={track.name} artist={track.artist} cover={track.cover} uri={track.uri}/>
        )};
        return (
        <div className="tracklist">
            {track}
        </div>
        );
    }
};

export { Tracks, TrackURI, Tracklist};