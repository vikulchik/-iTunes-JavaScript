let prevVolumeSlider = 0;
let prevVolumeSound = 0;

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoFullScreen  = document.querySelector('.video-fullscreen');
    const volumeDown = document.querySelector('.volume-down');

    const toggleIcon = () => {
        if(videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const togglePlay = () => {
        if(videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause()
        }

        toggleIcon()
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    const addZero = n => n < 10 ? '0' + n : n;

    const toggleIconVolume = (volume) => {
        if(volume === 0) {
            volumeDown.classList.remove('fa-volume-down');
            volumeDown.classList.add('fa-volume-off');
        } else {
            volumeDown.classList.add('fa-volume-down');
            volumeDown.classList.remove('fa-volume-off');
        }
    };

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor( currentTime / 60 );
        let secondsPassed = Math.floor( currentTime % 60 );

        let minuteTotal = Math.floor( duration / 60 );
        let secondsTotal = Math.floor( duration % 60 );

        videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed);
        videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal);
    });

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = ( value * duration ) / 100;
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
        toggleIconVolume(videoPlayer.volume)
    });

    videoFullScreen.addEventListener('click', () => {
        videoPlayer.webkitEnterFullScreen();
    });

    volumeDown.addEventListener('click', () => {
        if(videoPlayer.volume > 0) {
            prevVolumeSound = videoPlayer.volume; // Old player volume value
            prevVolumeSlider = videoVolume.value; // Old slider position value
            videoPlayer.volume = 0;
            videoVolume.value = 0;
        } else {
            videoPlayer.volume = prevVolumeSound;
            videoVolume.value = prevVolumeSlider;
        }
        toggleIconVolume(videoPlayer.volume)
    })

};