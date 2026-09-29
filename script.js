// A little face follows the mouse cursor (desktop only – touch screens have no mousemove)
let cursorTimeout;

window.addEventListener('load', () => {
    const follower = document.createElement('img');
    follower.src = 'cursor face moving.png';
    follower.alt = '';
    follower.style.position = 'absolute';
    follower.style.pointerEvents = 'none';
    follower.style.opacity = '0';
    follower.style.transition = 'opacity 0.3s ease';
    follower.classList.add('cursor-image-dimentions');
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
        clearTimeout(cursorTimeout);
        follower.style.left = `${e.pageX}px`;
        follower.style.top = `${e.pageY}px`;
        follower.style.opacity = '1';
        follower.src = 'cursor face moving.png';

        // Swap to the still face when the cursor stops
        cursorTimeout = setTimeout(() => {
            follower.src = 'cursor face still.png';
        }, 200);
    });

    document.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
    });
});
