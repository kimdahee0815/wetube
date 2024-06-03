const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = document.getElementById("playBtnIcon");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = document.getElementById("muteBtnIcon");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;
console.log(playBtnIcon);
const handlePlayClick = (e) => {
    //if video is playing, pause it
    // else play the video.
    if (video.paused) {
        video.play();
        if (e.target === video) {
        }
    } else {
        video.pause();
        if (e.target === video) {
        }
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-stop";
};

const handleMute = (e) => {
    if (Number(volumeValue) !== 0) {
        if (video.muted) {
            video.muted = false;
            muteBtnIcon.classList = volumeValue <= 0.5 ? "fas fa-volume-low" : "fas fa-volume-high";
        } else {
            video.muted = true;
            muteBtnIcon.classList = "fas fa-volume-xmark";
        }
    }
    video.volume = volumeRange.value = video.muted ? 0 : volumeValue;
};
const handleVolumeChange = (event) => {
    const {
        target: { value },
    } = event;
    if (video.muted) {
        video.muted = false;
    }
    if (Number(value) === 0) {
        video.muted = true;
        muteBtnIcon.classList = "fas fa-volume-xmark";
    } else {
        muteBtnIcon.classList = value <= 0.5 ? "fas fa-volume-low" : "fas fa-volume-high";
    }
    video.volume = volumeValue = value;
};

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};

const handleTimeupdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
    const {
        target: { value },
    } = event;
    video.currentTime = value;
};

const handleFullScreen = (e) => {
    const fullScreen = document.fullscreenElement;

    if (fullScreen) {
        document.exitFullscreen();
        fullScreenBtn.classList = "fas fa-expand";
    } else {
        videoContainer.requestFullscreen();
        fullScreenBtn.classList = "fas fa-compress";
    }
};

const handleMouseMove = () => {
    if (controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if (controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3 * 1000);
};

video.readyState ? handleLoadedMetadata() : video.addEventListener("loadedmetadata", handleLoadedMetadata);
// video.addEventListener("loadedmetadata", handleLoadedMetadata);
playBtnIcon.addEventListener("click", handlePlayClick);
muteBtnIcon.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("timeupdate", handleTimeupdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handlePlayClick);
