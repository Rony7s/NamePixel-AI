const input = document.getElementById("nameInput");
const output = document.getElementById("output");
const popup = document.getElementById("inputPopup");
const popupText = document.getElementById("popupText");
const qrBox = document.getElementById("qrBox");

// ---------------------------
// AUTO LOAD FROM URL
// Example: yoursite.com/?name=rony
// ---------------------------
window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const urlName = params.get("name");

  if (urlName) {
    input.value = urlName;
    generateName(urlName);
  }
};

// ENTER BUTTON
document.getElementById("enterButton").onclick = () => {
  generateName();
};

// GENERATE NAME
function generateName(customName = null) {
  let name = (customName || input.value).toLowerCase().trim();
  output.innerHTML = "";

  if (!name) {
    showPopup("Please enter a name!");
    return;
  }

  if (!/^[a-z]+$/.test(name)) {
    showPopup("Only A-Z letters allowed!");
    return;
  }

  for (let char of name) {
    let img = document.createElement("img");
    img.src = `img/${char}.jpg`;
    output.appendChild(img);
  }
}

// POPUP
function showPopup(msg) {
  popupText.innerText = msg;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}

// DOWNLOAD AS IMAGE
document.getElementById("downloadBtn").onclick = () => {
  let name = input.value || "namepixel";

  html2canvas(output).then(canvas => {
    let link = document.createElement("a");
    link.download = `${name}.png`;
    link.href = canvas.toDataURL();
    link.click();
  });
};

// LOAD html2canvas dynamically
const script = document.createElement("script");
script.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
document.head.appendChild(script);

// QR CODE
document.getElementById("qrCodeBtn").onclick = () => {
  qrBox.innerHTML = "";

  let name = input.value || "NamePixel AI By Rony Ahmmed";
  let url = `${window.location.origin}/NamePixel-AI/?name=${name}`;

  QRCode.toCanvas(document.createElement("canvas"), url, function (err, canvas) {
    if (!err) qrBox.appendChild(canvas);
  });
};