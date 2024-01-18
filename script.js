document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const tracklist = document.getElementById("tracklist");
    const nextButton = document.getElementById("next");

    const tracks = ['fiya.mp3', 'fallin.mp3', 'GenuineCharlie.mp3', 'Have it your way.mp3', 'ANYTHING 4 U.mp3'];
    let currentTrackIndex = 0;

    tracks.forEach((track, index) => {
        const li = document.createElement("li");
        li.textContent = track.slice(0, -4); // Remove the last 4 characters
        li.addEventListener("click", () => {
            currentTrackIndex = index;
            playTrack(track);
        });
        tracklist.appendChild(li);
    });

    nextButton.addEventListener("click", nextTrack);

    audio.addEventListener("ended", nextTrack);

    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        playTrack(tracks[currentTrackIndex]);
    }

    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        playTrack(tracks[currentTrackIndex]);
    }
    
    const prevButton = document.getElementById('prev');
    prevButton.addEventListener('click', prevTrack);
    

    function playTrack(track) {
        audio.src = `music/${track}`;
        audio.play();

        // Highlight the current track
        const lis = tracklist.getElementsByTagName("li");
        for (let li of lis) {
            li.classList.remove("current");
        }
        lis[currentTrackIndex].classList.add("current");
    }

    // Start playing the first track
    playTrack(tracks[currentTrackIndex]);

    

    // Add the grain effect code here
    const canvas = document.getElementById('grain');
    const ctx = canvas.getContext('2d');

    let width, height, frame = 0;
    let shadowX = 0;
    let shadowY = 0;
    let shadowDirectionX = 1;
    let shadowDirectionY = 1;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function draw() {
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const grain = Math.random() * 255;
            data[i] = grain;
            data[i + 1] = grain;
            data[i + 2] = grain;
            data[i + 3] = Math.random() < 0.1 ? 0 : 255;
        }

        ctx.putImageData(imageData, 0, 0);

        // Draw a blurry black shadow
        ctx.filter = 'blur(90px)';
        ctx.fillStyle = 'rgba(39, 41, 58, 0.8)'; // semi-transparent black
        ctx.beginPath();
        ctx.arc(shadowX, shadowY, 500, 0, Math.PI * 2, true); // Draw a circle
        ctx.closePath();
        ctx.fill();
        ctx.filter = 'none';

        // Move the shadow
        shadowX += shadowDirectionX;
        shadowY += shadowDirectionY;

        // Change direction when the shadow hits the edge of the canvas
        if (shadowX < 0 || shadowX > width - 200) {
            shadowDirectionX *= -1;
        }
        if (shadowY < 0 || shadowY > height - 200) {
            shadowDirectionY *= -1;
        }
    }

    function loop() {
        frame++;
        if (frame % 2 === 0) {
            draw();
        }
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    resize();
    loop();

    
    // Existing code up to line 108...

// Add the falling star emojis code here
function createFallingStar() {
    const star = document.createElement('div');
    star.textContent = '💧'; // Star emoji
    star.style.position = 'fixed';
    star.style.top = '-20px'; // Start above the top of the page
    star.style.left = Math.random() * window.innerWidth + 'px'; // Random horizontal position
    star.style.fontSize = Math.random() * 20 + 10 + 'px'; // Random size
    star.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random fall duration
    star.style.animationTimingFunction = 'linear';
    star.style.animationName = 'fall';
    document.body.appendChild(star);

    // Remove the star once the animation is done
    star.addEventListener('animationend', () => {
        document.body.removeChild(star);
    });
}

// Create a new falling star every 500 milliseconds
setInterval(createFallingStar, 5);

// CSS for the falling animation
const style = document.createElement('style');
style.textContent = `
@keyframes fall {
    to {
        transform: translateY(100vh);
    }
}
`;
document.head.appendChild(style);



// Continue with the rest of the code...

// Existing code up to line 157...

// Add the cloud generation code here
function createCloud() {
    const cloud = document.createElement('div');
    cloud.textContent = '☁️'; // Cloud emoji
    cloud.style.position = 'fixed';
    cloud.style.top = Math.random() * window.innerHeight + 'px'; // Random vertical position
    cloud.style.left = '-200px'; // Start 200px to the left of the page
    cloud.style.fontSize = Math.random() * 200 + 8 + 'px'; // Random size
    cloud.style.animationDuration = Math.random() * 60 + 8 + 's'; // Random move duration
    cloud.style.animationTimingFunction = 'ease-in-out';
    cloud.style.animationName = 'cloudMove';
    cloud.style.animationIterationCount = 'infinite'; // Make the animation repeat indefinitely
    document.body.appendChild(cloud);

    // Remove the cloud once the animation is done
    cloud.addEventListener('animationend', () => {
        document.body.removeChild(cloud);
    });
}

// Create a new cloud every 2 seconds
setInterval(createCloud, 800);

// CSS for the moving animation
const styleCloud = document.createElement('style');
styleCloud.textContent = `
@keyframes cloudMove {
    from {
        z-index: -1;
    }
    to {
        transform: translateX(200vw);
        z-index: -1;
    }
}
`;
document.head.appendChild(styleCloud);


// Create audio elements for the rain and storm sounds
const rainSound = new Audio('rain.wav');
const stormSound = new Audio('storm.mp3');

// Set the volume
rainSound.volume = 0.5;
stormSound.volume = 0.5;

// Loop the sounds
rainSound.loop = true;
stormSound.loop = true;

// Function to start playing the sounds
function playSounds() {
    rainSound.play();
    stormSound.play();
}

// Play the sounds when the user clicks anywhere on the page
document.addEventListener('click', playSounds);

// Play the sounds when the user presses any key
document.addEventListener('keydown', playSounds);


});