const audioFiles = [
    { name: 'Coldplay - Yellow', src: 'music/Coldplay - Yellow.mp3', image: 'trackimages/track1.jpg' },
    { name: 'Eminem - Lose Yourself', src: 'music/eminem lose your s.mp3', image: 'trackimages/track2.jpg' },
    { name: 'Linkin Park - In The End', src: 'music/In the end - Linkin Park.mp3', image: 'trackimages/track3.jpg' },
    { name: 'The Weeknd - Blinding Lights', src: 'music/The Weeknd - Blind.mp3', image: 'trackimages/track4.jpg' },
    { name: 'Metallica - Nothing Else Matters', src: 'music/08NothingElseMatters.mp3', image: 'trackimages/track5.jpg' },
    { name: 'Imagine Dragons - Radioactive', src: 'music/Radioactive.mp3', image: 'trackimages/track6.jpg' }
];

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const trackTitle = document.getElementById('track-title');
const trackImage = document.getElementById('track-image');

let currentTrackIndex = 0;

function loadTrack(index) {
    const track = audioFiles[index];
    audio.src = track.src;
    trackTitle.textContent = track.name;
    trackImage.src = track.image;
}

function playTrack() {
    audio.play();
    playBtn.textContent = '⏸️';
}

function pauseTrack() {
    audio.pause();
    playBtn.textContent = '▶️';
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        playTrack();
    } else {
        pauseTrack();
    }
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + audioFiles.length) % audioFiles.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % audioFiles.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    
    // Update time
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

audio.addEventListener('ended', () => {
    nextBtn.click();
});

function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Load first track
loadTrack(currentTrackIndex);
