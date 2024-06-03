const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
    console.dir(playBtn);
    //if video is playing, pause it
    // else play the video.
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
};
const handlePause = () => {
    playBtn.innerText = "Play";
};
const handlePlay = () => {
    playBtn.innerText = "Pause";
};

const handleMute = (e) => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    video.volume = volumeRange.value = video.muted ? 0 : volumeValue;
};
const handleVolumeChange = (event) => {
    const {
        target: { value },
    } = event;
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    if (Number(value) === 0) {
        video.muted = true;
        muteBtn.innerText = "Unmute";
    }
    volumeValue = value;
    video.volume = value;
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
    console.log(value);
    video.currentTime = value;
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeupdate);
timeline.addEventListener("input", handleTimelineChange);
