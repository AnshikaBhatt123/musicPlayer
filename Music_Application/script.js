const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const volumeSlider = document.getElementById('volume-slider');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const songList = document.querySelectorAll('.song-list li');

let isPlaying = false;
let currentSongIndex = 0;

function togglePlayPause() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
}

function play() {
    audio.play();
    playPauseButton.textContent = 'Pause';
    isPlaying = true;
}

function pause() {
    audio.pause();
    playPauseButton.textContent = 'Play';
    isPlaying = false;
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    playSong(songList[currentSongIndex].getAttribute('data-src'));
}

function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
    playSong(songList[currentSongIndex].getAttribute('data-src'));
}

function playSong(src) {
    audio.src = src;
    play();
}

function setVolume() {
    audio.volume = volumeSlider.value;
}

function updateProgressBar() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = (currentTime / duration) * 100;

    currentTimeDisplay.textContent = formatTime(currentTime);
    durationDisplay.textContent = formatTime(duration);
    progressBar.style.width = progress + '%';
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Add event listeners
playPauseButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', playPrevious);
nextButton.addEventListener('click', playNext);
volumeSlider.addEventListener('input', setVolume);

audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', () => {
    playPauseButton.textContent = 'Play';
    isPlaying = false;
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    playSong(songList[currentSongIndex].getAttribute('data-src'));
});

// Initial play
playSong(songList[currentSongIndex].getAttribute('data-src'));
