export const radioPlayerInit = () => {
    const radio  = document.querySelector('.radio');
    const radioNavigation  = document.querySelector('.radio-navigation');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');
    const volumeSection = document.querySelector('.volume-section');
    const radioVolume = document.querySelector('.radio-volume');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;
    volumeSection.classList.add('volume-hidden');

    const changeIconPlay = () => {
        if(audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');
        const title = parent.querySelector('.radio-name').textContent;
        const urlImg = parent.querySelector('.radio-img').src;

        radioCoverImg.src = urlImg;
        radioHeaderBig.textContent = title;
        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;

        volumeSection.classList.remove('volume-hidden');

        audio.play();
        changeIconPlay();
        selectItem(parent);
    });

    radioStop.addEventListener('click', () => {
        if(audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    })
};