import React from 'react';
import Thumbnail from '../Thumbnail/Thumbnail';

const YoutubeSection = ({activeMedia, displayThumbnails, setDisplayThumbnails, setDisplayVideo, setActiveVideoID}) =>{
  const renderThumbnails = () => {
    if (!activeMedia.videos) {
      return
    }

    if (activeMedia.videos.results.length === 0) {
      return
    }
    if (activeMedia.videos.results.length <=3){ //if 3 or less trailers dont render the scroll option
      return activeMedia.videos.results.map((video) =>{
        console.log(video.key)
        return <Thumbnail video={video} handleThumbnailClick={handleThumbnailClick} key={video.id} />
  })
  return
}

    return displayThumbnails.current.map((num) => { ///this is more than the num of videos(trailers) in some movies
      return <Thumbnail video={activeMedia.videos.results[num]} handleThumbnailClick={handleThumbnailClick} key={activeMedia.videos.results[num].id} />
    })
  }


  const scrollThumbnails = (direction) => {
    if (direction === "left") {
      const newCurrent = displayThumbnails.current.map((num) =>{
        if (num === 0){
          return displayThumbnails.max-1
        }
        return num-=1;
      })
      setDisplayThumbnails(prevState =>{
        return {max: prevState.max, current: newCurrent}
      }, () =>{
      })
    }
    else {
      const newCurrent = displayThumbnails.current.map((num) => {
        if (num === displayThumbnails.max-1){
          return 0;
        }
        return num+=1;
      })
      setDisplayThumbnails(prevState =>{
        return {max: prevState.max, current: newCurrent}
      }, () =>{
      })

    }
  }

  const handleThumbnailClick = (key) => {  //renders a youtube modal when a thumbnail is clicked
    setDisplayVideo(true);
    setActiveVideoID(key);
  }

  return (
    <>
    {displayThumbnails.max > 3 ? <div className = "horizontal-scroll" onClick = {() => scrollThumbnails("left")}>
      <img src="https://img.icons8.com/material-outlined/24/000000/double-left.png"/>
    </div> : null}
    <div className = "youtube-thumbnails">{renderThumbnails()}</div>
    {displayThumbnails.max > 3 ? <div className = "horizontal-scroll" onClick = {() => scrollThumbnails("left")}>
      <img src="https://img.icons8.com/ios-glyphs/30/000000/double-right--v2.png"/>
    </div> : null}
    </>
  )
}

export default YoutubeSection;
