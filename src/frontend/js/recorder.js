import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
    input: "recording.webm",
    output: "output.mp4",
    thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
};

const updateProgress = (val, text) => {
    const progressBar = document.getElementById("uploadProgress");
    progressBar.value = val;
    progressBar.innerText = `${Math.round(val)}%`;
    if (text) progressBar.dataset.label = text;
};

const handleDownload = async () => {
    actionBtn.removeEventListener("click", handleDownload);
    actionBtn.innerText = "Transcoding...";
    actionBtn.disabled = true;

    const progressBar = document.getElementById("uploadProgress");
    updateProgress(10, "Loading FFmpeg...");

    const ffmpeg = new FFmpeg();
    await ffmpeg.load();

    updateProgress(30, "Writing input file...");
    await ffmpeg.writeFile(files.input, await fetchFile(videoFile));

    updateProgress(50, "Converting to MP4...");
    await ffmpeg.exec(["-i", files.input, "-r", "60", files.output]);

    updateProgress(75, "Extracting thumbnail...");
    await ffmpeg.exec(["-i", files.input, "-ss", "00:00:00", "-frames:v", "1", files.thumb]);

    updateProgress(85, "Reading files...");
    const mp4File = await ffmpeg.readFile(files.output);
    const thumbFile = await ffmpeg.readFile(files.thumb);

    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    updateProgress(95, "Downloading...");
    downloadFile(mp4Url, "MyRecording.mp4");
    downloadFile(thumbUrl, "MyThumbnail.jpg");

    await ffmpeg.deleteFile(files.input);
    await ffmpeg.deleteFile(files.output);
    await ffmpeg.deleteFile(files.thumb);

    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(videoFile);

    updateProgress(100, "Done!");

    actionBtn.innerText = "Record Again";
    actionBtn.disabled = false;
    actionBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
    actionBtn.innerText = "Download Recording";
    actionBtn.removeEventListener("click", handleStop);
    actionBtn.addEventListener("click", handleDownload);

    recorder.stop();
};

const handleStart = () => {
    actionBtn.innerText = "Stop Recording";
    actionBtn.removeEventListener("click", handleStart);
    actionBtn.addEventListener("click", handleStop);

    recorder = new window.MediaRecorder(stream, { mimeType: "video/webm" });

    console.log(recorder);
    recorder.ondataavailable = (event) => {
        console.log("recording finished");
        console.log(event.data);
        videoFile = URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
    };
    recorder.start();
};

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    video.srcObject = stream;
    video.play();
};

init();

actionBtn.addEventListener("click", handleStart);

