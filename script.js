const apps = [
    { name: "YouTube", url: "https://www.youtube.com" },
    { name: "TikTok", url: "https://www.tiktok.com" },
    { name: "Facebook", url: "https://www.facebook.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "Instagram", url: "https://www.instagram.com" }
];

const appButtonsContainer = document.getElementById("app-buttons");
const windowsContainer = document.getElementById("windows-container");

apps.forEach(app => {
    const button = document.createElement("button");
    button.textContent = `Open ${app.name}`;
    button.onclick = () => openApp(app);
    appButtonsContainer.appendChild(button);
});

function openApp(app) {
    const windowDiv = document.createElement("div");
    windowDiv.className = "window";
    windowDiv.style.left = "50px";
    windowDiv.style.top = "50px";

    const header = document.createElement("div");
    header.className = "window-header";
    header.innerHTML = `<span>${app.name}</span><button onclick="closeApp(this)">✖</button>`;

    const iframe = document.createElement("iframe");
    iframe.src = app.url;

    windowDiv.appendChild(header);
    windowDiv.appendChild(iframe);
    windowsContainer.appendChild(windowDiv);

    // Make window draggable
    makeDraggable(windowDiv);
}

function closeApp(button) {
    button.parentElement.parentElement.remove();
}

function makeDraggable(windowDiv) {
    let isDragging = false, offsetX, offsetY;
    
    const header = windowDiv.querySelector(".window-header");

    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - windowDiv.offsetLeft;
        offsetY = e.clientY - windowDiv.offsetTop;
        document.addEventListener("mousemove", moveWindow);
        document.addEventListener("mouseup", () => isDragging = false);
    });

    function moveWindow(e) {
        if (!isDragging) return;
        windowDiv.style.left = `${e.clientX - offsetX}px`;
        windowDiv.style.top = `${e.clientY - offsetY}px`;
    }
}