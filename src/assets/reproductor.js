var video;
var hls;

function VideoHls(videoSource, action, isMobile, playerID) {
  if (Hls.isSupported() && videoSource != '' && action == 'play') {
    video = document.getElementById(playerID);
    hls = new Hls();
    getListeners(isMobile, playerID);
    hls.loadSource(videoSource);
    hls.attachMedia(video);
    if(playerID == "videoPreview"){
      hls.subtitleDisplay = false;
    }
    video.play();
    if(playerID == "videoPreview"){
      hls.levels[0];
    };
  }
  else if (videoSource != '' && action == 'play') {
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSource;
      video.addEventListener('loadedmetadata', function () {
        video.play();
      });
    }
  }else if(videoSource == '' && action == 'pause'){
    hls.stopLoad();
    var vid = document.getElementById(playerID) ;
    vid.pause();
  }else if(videoSource == '' && action == 'mute'){
    var vid = document.getElementById(playerID) ;
    vid.muted = true;
  }else if(videoSource == '' && action == 'unmute'){
    var vid = document.getElementById(playerID) ;
    vid.muted = false;
  }else if (videoSource == '' && action == 'stop') {
    if (hls !== undefined && video !== undefined) {
      hls.stopLoad();
      hls.destroy();
    }
  }else if(videoSource == '' && action == 'resume'){
    var vid = document.getElementById(playerID) ;
    vid.play();
  }else if(videoSource == '' && action == 'enableFullscreen'){
    var vid = document.getElementById(playerID) ;
    vid.requestFullscreen();
    vid.setAttribute("controlsList","nofullscreen");
  }
}

function getListeners(isMobile, playerID){
  hls.on(Hls.Events.ERROR, function (event, data) {
    
    var errorType = data.type;
    var errorDetails = data.details;
    var errorFatal = data.fatal;
  
    if(errorDetails == 'manifestLoadError'){
      if(playerID == 'video'){
        document.getElementById(playerID).style.backgroundImage = "url(../../assets/videoError.png)";
        document.getElementById(playerID).style.backgroundSize = "100px";
      }else if(playerID == 'videoPreview' || playerID == 'videoDesktop'){
        document.getElementById(playerID).style.backgroundImage = "none";
        // document.getElementById(playerID).style.backgroundSize = "20px";
      }
    }
  });

  hls.on(Hls.Events.BUFFER_CREATED, function (event, data) {
    
    document.getElementById(playerID).style.backgroundImage = "none";
    if(isMobile){
      if(playerID == "video"){
        video.setAttribute("controls","");
      }
    }
  });

  hls.on(Hls.Events.MEDIA_ATTACHED, function (event, data) {
    
    document.getElementById(playerID).style.backgroundImage = "url(../../assets/loading.gif)";
    if(isMobile){
      if(playerID == "video"){
        video.setAttribute("controls","");
      }
    }
  });
}
