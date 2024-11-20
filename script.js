const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('imageUpload');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const fontSizeInput = document.getElementById('fontSize');
const fontColorInput = document.getElementById('fontColor');

let memeImage = new Image();
let memeWidth = 0;
let memeHeight = 0;

function updateMeme() {
    if (memeImage.src) {
        drawMeme();
    }
}

function drawMeme() {
    const topText = topTextInput.value;
    const bottomText = bottomTextInput.value;
    const fontSize = fontSizeInput.value;
    const fontColor = fontColorInput.value;

    // Set canvas size to match image
    canvas.width = memeWidth;
    canvas.height = memeHeight;

    // Draw the image
    ctx.drawImage(memeImage, 0, 0, memeWidth, memeHeight);

    // Set the font styles for text
    ctx.font = `${fontSize}px Impact`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw top text
    if (topText) {
        ctx.fillText(topText, memeWidth / 2, 40);
    }

    // Draw bottom text
    if (bottomText) {
        ctx.fillText(bottomText, memeWidth / 2, memeHeight - 40);
    }
}

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            memeImage.onload = function() {
                memeWidth = memeImage.width;
                memeHeight = memeImage.height;
                drawMeme();
            }
            memeImage.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

function downloadImage() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'meme.png';
    link.click();
}

// Placeholder for GIF and video download functions
function downloadGif() {
    alert("GIF download is not implemented yet.");
}

function downloadVideo() {
    alert("Video download is not implemented yet.");
}
