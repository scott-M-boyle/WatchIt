import React from 'react';
import './Thumbnail.css';

const Thumbnail = (props) =>{



  return <div className = "thumbnail">
    <div className = "thumbnail-image">
      <img src={`https://img.youtube.com/vi/${props.video.key}/0.jpg`} alt={props.video.name}
       onClick={() => props.handleThumbnailClick(props.video.key)}  />
      <div className = "play-video">
        <img src="https://img.icons8.com/flat-round/50/000000/play--v1.png" alt="play"/> <
      /div>
      </div>
          <h4> {props.video.name} </h4>
      </div>
}

export default Thumbnail
