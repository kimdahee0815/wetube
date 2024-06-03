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
    if (video.muted && Number(volumeValue) !== 0) {
        video.muted = false;
        muteBtnIcon.classList.remove("fa-volume-xmark");
        volumeValue <= 0.5 ? muteBtnIcon.classList.add("fa-volume-low") : muteBtnIcon.classList.add("fa-volume-high");
    } else if (!video.muted && Number(volumeValue) !== 0) {
        video.muted = true;
        muteBtnIcon.classList.remove("fa-volume-high");
        muteBtnIcon.classList.remove("fa-volume-low");
        muteBtnIcon.classList.add("fa-volume-xmark");
    }
    video.volume = volumeRange.value = video.muted ? 0 : volumeValue;
};
const handleVolumeChange = (event) => {
    const {
        target: { value },
    } = event;
    muteBtnIcon.classList.remove("fa-volume-xmark");
    muteBtnIcon.classList.remove("fa-volume-low");
    muteBtnIcon.classList.remove("fa-volume-high");
    console.log(value);
    if (video.muted) {
        video.muted = false;
    }

    volumeValue = value;
    video.volume = value;

    if (Number(value) === 0) {
        video.muted = true;
        muteBtnIcon.classList.add("fa-volume-xmark");
    } else {
        value <= 0.5 ? muteBtnIcon.classList.add("fa-volume-low") : muteBtnIcon.classList.add("fa-volume-high");
    }
};

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};

const handleTimeupdate = () => {
    console.log(video.currentTime);
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
        fullScreenBtn.classList.remove("fa-compress");
        fullScreenBtn.classList.add("fa-expand");
    } else {
        videoContainer.requestFullscreen();
        fullScreenBtn.classList.remove("fa-expand");
        fullScreenBtn.classList.add("fa-compress");
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
console.log("hi");
