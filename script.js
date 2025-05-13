const quotes = [
    "waky waky eggs and punch in the face.",
    "il sole bacia i belli",
    "lavati che ti puzza il marameo",
    "amare è bellissimo, se contraccambiato, altrimenti sei sfigato",
];

function showRandomQuote() {
    const quoteBox = document.getElementById("quote-box");
    quoteBox.classList.add("fade-out");

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteBox.innerText = quotes[randomIndex];
        quoteBox.classList.remove("fade-out");
        quoteBox.classList.add("fade-in");

        setTimeout(() => {
            quoteBox.classList.remove("fade-in");
        }, 400); // Match this to the CSS duration
    }, 400); // Match this to the CSS duration

    const counter = document.getElementById("quote-counter");
    counter.innerText = parseInt(counter.innerText) + 1;
}

let cursorTimeout;

window.onload = () => {
    const topImage = document.getElementById('top-image'); // Select by id
    console.log("Page loaded");
    if (topImage) {
        topImage.style.opacity = '1'; // Directly set opacity to ensure visibility
        topImage.classList.add('fade-in-image'); // Add class to fade in the image
        console.log("Fade-in class added to the image.");
    } else {
        console.error("Element with id 'top-image' not found.");
    }

    const audio = document.getElementById('song1');
    if (audio && topImage) {
        topImage.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                console.log("Audio started playing.");
            } else {
                audio.pause();
                console.log("Audio paused.");
            }
        });
    } else {
        console.error("Audio element or top image not found.");
    }

    const video = document.getElementById('bachata-video1');
    if (video) {
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                video.muted = false; // Unmute the video when played
                console.log("Video started playing.");
            } else {
                video.pause();
                console.log("Video paused.");
            }
        });
    }

    const follower = document.createElement('img');
    follower.src = 'cursor face moving.png'; // Image that follows the cursor
    follower.style.position = 'absolute';
    follower.style.pointerEvents = 'none';
    follower.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(follower);
    follower.classList.add('cursor-image-dimentions');

    const replacementImage = 'cursor face still.png'; // Image to show when cursor stops

    document.addEventListener('mousemove', (e) => {
        clearTimeout(cursorTimeout); // Clear any existing timeout

        // Update the position of the follower image
        follower.style.left = `${e.pageX}px`;
        follower.style.top = `${e.pageY}px`;
        follower.style.opacity = '1';
        follower.src = 'cursor face moving.png'; // Reset to the original image

        // Set a timeout to replace the image when the cursor stops
        cursorTimeout = setTimeout(() => {
            follower.src = replacementImage;
        }, 200); // 500ms delay before replacing the image
    });

    document.addEventListener('mouseleave', () => {
        follower.style.opacity = '0'; // Hide the follower when the cursor leaves the page
    });

    console.log("Page loaded.");
    initializeCarousel();
};

function popup1() {
    alert("Welcome to the bachata world!");  
}

function openPopup2() {
    const popup2 = document.getElementById("popup2");
    const overlay = document.getElementById("overlay");
    popup2.style.display = "block";
    overlay.style.display = "block"; // Show the overlay
}

function closePopup2() {
    const popup2 = document.getElementById("popup2");
    const overlay = document.getElementById("overlay");
    popup2.style.display = "none";
    overlay.style.display = "none"; // Hide the overlay
}

function navigateToPage(page) {
    window.location.href = page; // Redirects to the specified page
}

// Carousel code

function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const videos = document.querySelectorAll('.carousel-track video');
    const prevButton = document.querySelector('.carousel-button.prev');  
    const nextButton = document.querySelector('.carousel-button.next');

    if (!track) {
        console.error("Carousel track not found.");
        return; // Exit if carousel elements are not present
    } else {
        console.log("Carousel track found.");
    }

    if (!prevButton) {
        console.error("Previous button not found.");
        return;
    } else {
        console.log("Previous button found.");
    }

    if (!nextButton) {
        console.error("Next button not found.");
        return;
    } else {
        console.log("Next button found.");
    }

    let currentIndex = 0;
    let previousIndex = 0; // Track the previously visible video

    function updateCarousel() {
        console.log("Updating carousel. Current index:", currentIndex);

        // Handle fade-out for the previous video
        if (previousIndex !== currentIndex) {
            const previousVideo = videos[previousIndex];
            if (previousVideo) {
                previousVideo.classList.remove("visible"); // Remove the visible class
                previousVideo.classList.add("fading-out"); // Add the fade-out class
                setTimeout(() => {
                    previousVideo.classList.remove("fading-out"); // Clean up after fade-out
                    previousVideo.style.visibility = "hidden"; // Hide the video after fading out
                }, 500); // Match the CSS transition duration
            }
        }

        // Handle fade-in for the current video
        videos.forEach((video, index) => {
            if (index === currentIndex) {
                video.style.left = "0"; // Center the current video
                video.style.visibility = "visible"; // Make it visible
                video.style.zIndex = "1"; // Bring it to the front
                video.classList.add("visible"); // Add fade-in effect
            } else {
                video.style.left = `${(index - currentIndex) * 100}%`; // Position videos
                video.style.zIndex = "0"; // Send them to the back
            }
            console.log(`Video ${index} positioned at ${video.style.left}, visibility: ${video.style.visibility}`);
        });

        // Update the previous index
        previousIndex = currentIndex;
    }

    function triggerBounce(direction) {
        const bounceClass = direction === "forward" ? "bounce" : "bounce-reverse";
        track.classList.add(bounceClass); // Add the appropriate bounce animation class
        setTimeout(() => {
            track.classList.remove(bounceClass); // Remove the class after the animation ends
        }, 500); // Match the CSS animation duration
    }

    nextButton.addEventListener('click', () => {
        console.log("Next button clicked.");
        if (currentIndex < videos.length - 1) {
            currentIndex++;
            console.log("Moving to next video. New index:", currentIndex);
            updateCarousel();
            console.log("Next video button triggered.");
        } else {
            console.error("Next video button NOT triggered. Already at the last video.");
            triggerBounce("forward"); // Trigger forward bounce animation
        }
    });

    prevButton.addEventListener('click', () => {
        console.log("Previous button clicked.");
        if (currentIndex > 0) {
            currentIndex--;
            console.log("Moving to previous video. New index:", currentIndex);
            updateCarousel();
            console.log("Previous video button triggered.");
        } else {
            console.error("Previous video button NOT triggered. Already at the first video.");
            triggerBounce("reverse"); // Trigger reverse bounce animation
        }
    });

    updateCarousel(); // Initialize the carousel
}
