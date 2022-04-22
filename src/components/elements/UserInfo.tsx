import React from 'react';

const Playlist = ({coverURL,playlistTitle}) => {
  return <div className="playlistBox">
          <img src={coverURL} alt="" />
          <h5>{playlistTitle}</h5>
        </div>
}

export {Playlist};

const ProfileCard = ({imgURL,userName,userFolls}) => {
  return <div className="profileCard">
            <div className="col1">
              <img src={imgURL} alt=''/>
            </div>
            <div className="col2">
              <div className="textDetail">
                  <h1>{userName}</h1>
                  <h5>{userFolls} Followers</h5>
              </div>
            </div>
          </div>
}

interface datatype {
  data:{};
}

let playlistItem;
class PlaylistCard extends React.Component<datatype> {
  render(){
  const data = this.props.data;
  if (data){
    playlistItem=Object.values(data as any).map((item :any) =>
    <Playlist key={item.id} coverURL={item.images[0].url} playlistTitle={item.name}/>);
  };
  return <div className='playlistCard'>
          {playlistItem}
         </div>
}}

export {ProfileCard, PlaylistCard};