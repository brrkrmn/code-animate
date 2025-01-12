const toggleFullScreen = () => {
  if (!window.screenTop && !window.screenY) {
    document.exitFullscreen();
  } else {
    document.body.requestFullscreen();
  }
};

export default toggleFullScreen;
