var video;
var hls;

function VideoHls(videoSource, action) {
  if (Hls.isSupported() && videoSource != '' && action == 'play') {
    video = document.getElementById('video');
    hls = new Hls();
    getListeners();
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

function getListeners(){
  hls.on(Hls.Events.ERROR, function (event, data) {

    console.log(data);

    document.getElementById('video').style.backgroundImage="url(../../assets/videoError.png)";
    document.getElementById("video").style.backgroundSize = "100px";

    var errorType = data.type;
    var errorDetails = data.details;
    var errorFatal = data.fatal;
  
    switch (data.details) {
      case Hls.ErrorDetails.FRAG_LOAD_ERROR:
        // ....
        break;
      default:
        break;
    }
  });
}