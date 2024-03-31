var video;
var hls;
var showMenu = false;
function VideoHls(videoSource, action, isMobile, playerID) {
  if (Hls.isSupported() && videoSource != '' && action == 'play') {
    if (playerID == 'videoDesktop') {
      document.getElementById(playerID).style.backgroundSize = "30%";
      document.getElementById(playerID).style.backgroundImage = "url(../../assets/loadingSpinner.gif)";

    }
    video = document.getElementById(playerID);
    hls = new Hls();
    getListeners(isMobile, playerID);
    hls.loadSource(videoSource);
    hls.attachMedia(video);
    if (playerID == "videoPreview") {
      hls.subtitleDisplay = false;
    }
    video.play();
    if (playerID == "videoPreview") {
      hls.currentLevel = 0;
      hls.nextLevel = 0;
      hls.loadLevel = 0;
    };
  }
  else if (videoSource != '' && action == 'play') {
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSource;
      video.addEventListener('loadedmetadata', function () {
        video.play();
      });
    }
  } else if (videoSource == '' && action == 'pause') {
    hls.stopLoad();
    var vid = document.getElementById(playerID);
    vid.pause();
  } else if (videoSource == '' && action == 'mute') {
    var vid = document.getElementById(playerID);
    vid.muted = true;
  } else if (videoSource == '' && action == 'unmute') {
    var vid = document.getElementById(playerID);
    vid.muted = false;
  } else if (videoSource == '' && action == 'stop') {
    if (hls !== undefined && video !== undefined) {
      hls.stopLoad();
      hls.destroy();
    }
  } else if (videoSource == '' && action == 'resume') {
    var vid = document.getElementById(playerID);
    vid.play();
  } else if (videoSource == '' && action == 'enableFullscreen') {
    var vid = document.getElementById(playerID);
    vid.requestFullscreen();
    vid.setAttribute("controlsList", "nofullscreen");
  }else if (videoSource == '' && action == 'disableFullscreen') {
    var vid = document.getElementById(playerID);
    document.exitFullscreen();
  }
}

function getListeners(isMobile, playerID) {
  hls.on(Hls.Events.ERROR, function (event, data) {

    var errorType = data.type;
    var errorDetails = data.details;
    var errorFatal = data.fatal;

    if (errorDetails == 'manifestLoadError') {
      if (playerID == 'video') {
        document.getElementById(playerID).style.backgroundImage = "url(../../assets/videoError.png)";
        document.getElementById(playerID).style.backgroundSize = "100px";
      } else if (playerID == 'videoPreview') {
        document.getElementById(playerID).style.backgroundImage = "none";
        // document.getElementById(playerID).style.backgroundSize = "20px";
      } else if (playerID == 'videoDesktop') {
        document.getElementById(playerID).style.backgroundImage = "url(../../assets/videoError.png)";
        document.getElementById(playerID).style.backgroundSize = "15%";
      }
    }
  });

  hls.on(Hls.Events.BUFFER_CREATED, function (event, data) {

    document.getElementById(playerID).style.backgroundImage = "none";
    setTimeout(()=>{
      document.getElementById("cont").style.opacity = "0.5";
      setTimeout(()=>{
        document.getElementById("cont").style.opacity = "0";
      },1000);
    },500);
    switch (playerID) {
      case "video":
        video.setAttribute("controls", "");

        break;
      case "videoDesktop":
        // var vid = document.getElementById(playerID);
        // vid.requestFullscreen();
        // console.log("vid.requestFullscreen()");
      default:
        break;
    }
  });

  hls.on(Hls.Events.MEDIA_ATTACHED, function (event, data) {

    // document.getElementById(playerID).style.backgroundImage = "url(../../assets/loading.gif)";
    switch (playerID) {
      case "video":
        video.setAttribute("controls", "");
        break;
      case "videoDesktop":
        // var vid = document.getElementById(playerID);
        // vid.requestFullscreen();
        // console.log("vid.requestFullscreen()");
      default:
        break;
    }
  });
}

function setMenuActive(isActive){
  if(isActive){
    document.getElementById("channels").style.opacity = "1";
    showMenu = true;
  }else{
    document.getElementById("channels").style.opacity = "0";
    showMenu = false;
  }
}

function isMenuActive(){
  return showMenu;
}