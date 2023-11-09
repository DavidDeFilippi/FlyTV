var video;
var hls;

function VideoHls(videoSource, action) {
  if (Hls.isSupported() && videoSource != '' && action == 'play') {
    video = document.getElementById('video');
    hls = new Hls();
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