import React from 'react';
import Modal from '../Modal/Modal';

import './Video.css';

const Video = ({ videoKey}) =>{
  return (
    <Modal>
    <div className = "video">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${videoKey}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
      <div className = "close-video"> X </div>
    </div>
    </Modal>
  )
}

export default Video;
