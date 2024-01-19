var video;
var hls;

// document.addEventListener(
//   "keydown",
//   (event) => {
//     console.log(event.key);
//     document.getElementById('keycodelistener').innerHTML = event.key;
//   },
//   false,
// );

function VideoHls(videoSource, action, isMobile) {
  if (Hls.isSupported() && videoSource != '' && action == 'play') {
    video = document.getElementById('video');
    hls = new Hls();
    getListeners(isMobile);
    hls.loadSource(videoSource);
    hls.attachMedia(video);
    video.play();
  }
  else if (videoSource != '' && action == 'play') {
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSource;
      video.addEventListener('loadedmetadata', function () {
        video.play();
      });
    }
  }
  else if (videoSource == '' && action == 'stop') {
    if (hls !== undefined && video !== undefined) {
      hls.stopLoad();
      hls.destroy();
    }
  }
}

function getListeners(isMobile){
  hls.on(Hls.Events.ERROR, function (event, data) {
    
    var errorType = data.type;
    var errorDetails = data.details;
    var errorFatal = data.fatal;
  
    if(errorDetails == 'manifestLoadError'){
      document.getElementById('video').style.backgroundImage = "url(../../assets/videoError.png)";
      document.getElementById("video").style.backgroundSize = "100px";
    }
  });

  hls.on(Hls.Events.BUFFER_CREATED, function (event, data) {
    
    document.getElementById('video').style.backgroundImage = "none";
    if(isMobile){
      video.setAttribute("controls","");
    }
  });
}
