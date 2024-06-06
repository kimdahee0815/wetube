const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComments = document.querySelector(".video__comments__view ul");
const videoId = videoContainer.dataset.videoid;

const addComment = (text, comment) => {
    const newComment = document.createElement("li");
    newComment.className = "video__comment";
    const icon = document.createElement("icon");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    span.className = "text__comment";
    const spanRemove = document.createElement("span");
    spanRemove.innerText = "❌";
    spanRemove.className = "remove__comment";
    spanRemove.dataset.commentId = comment._id;
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(spanRemove);
    videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;

    const video = videoContainer.dataset.video;
    console.log(video);
    if (!text) {
        return;
    }
    const res = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    textarea.value = "";
    const resJson = await res.json();
    console.log(resJson);
    if (res.status === 201) {
        addComment(text, resJson);
    }
};

const handleDeleteComment = async (e) => {
    const {
        dataset: { comment },
    } = e.target;
    const deleteElement = e.target;
    const video__comments__view = document.querySelector(".video__comments__view");
    const {
        dataset: { userid },
    } = video__comments__view;
    if (deleteElement.classList.contains("remove__comment")) {
        const commentObj = JSON.parse(comment);
        if (commentObj.owner === userid) {
            const commentId = commentObj._id;
            deleteElement.closest(".video__comment").remove();
            const res = await fetch(`/api/videos/${videoId}/comment`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ commentId }),
            });
            console.log(res);
        }
    }
};

if (form) {
    form.addEventListener("submit", handleSubmit);
    videoComments?.addEventListener("click", handleDeleteComment);
}
