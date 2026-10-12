const videoForm = document.getElementById("videoForm");
const videoUrl = document.getElementById("videoUrl");
const videoBox = document.getElementById("videoBox");
const message = document.getElementById("message");

videoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const url = videoUrl.value.trim();
  let videoId = "";

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1);
    } else if (
      parsedUrl.hostname === "youtube.com" ||
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "m.youtube.com"
    ) {
      if (parsedUrl.pathname === "/watch") {
        videoId = parsedUrl.searchParams.get("v") || "";
      } else if (parsedUrl.pathname.startsWith("/embed/")) {
        videoId = parsedUrl.pathname.split("/")[2] || "";
      } else if (parsedUrl.pathname.startsWith("/shorts/")) {
        videoId = parsedUrl.pathname.split("/")[2] || "";
      }
    }

    // Chỉ chấp nhận ID video YouTube hợp lệ
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      message.textContent = "Vui lòng nhập đường dẫn video YouTube hợp lệ.";
      message.style.color = "#d93025";
      return;
    }

    // Hiển thị video trên trang
    videoBox.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + videoId;
    iframe.title = "Video giới thiệu bản thân";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";

    videoBox.appendChild(iframe);

    message.textContent = "Đã hiển thị video thành công!";
    message.style.color = "#188038";
  } catch (error) {
    message.textContent = "Đường dẫn không hợp lệ. Hãy kiểm tra lại URL.";
    message.style.color = "#d93025";
  }
});
