let meowCount = 0;
const maxMeowCount = 9; // Увеличено до 9 нажатий
const videos = [
    document.querySelector('#video1 video'),
    document.querySelector('#video2 video'),
    document.querySelector('#video3 video'),
    document.querySelector('#video4 video')
];

const memeImgSrc = 'meme.jpg'; // Путь к изображению "Мем"
const memeSoundSrc = 'meme-sound.mp3'; // Путь к звуку "Мем"
const meowButton = document.getElementById('meowButton');
let lastMemeAudio = null;
let memeElements = [];

// Функция для воспроизведения звука
function playSound() {
    if (lastMemeAudio) {
        lastMemeAudio.pause();
        lastMemeAudio.currentTime = 0;
    }
    lastMemeAudio = new Audio(memeSoundSrc);
    lastMemeAudio.play();
}

// Видео контроллеры
videos.forEach(video => {
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
});

meowButton.addEventListener('click', () => {
    if (meowCount < 4) {
        // Замена видео на изображение "Мем"
        const videoWrapper = document.querySelector(`#video${meowCount + 1}`);
        videoWrapper.innerHTML = `<img src="${memeImgSrc}" class="meme-image">`;
        playSound();
        memeElements.push(videoWrapper.querySelector('img'));
    } else if (meowCount === 4) {
        // Заполнение левой половины экрана
        const memeElement = document.createElement('img');
        memeElement.src = memeImgSrc;
        memeElement.classList.add('half-width', 'left-half');
        document.body.appendChild(memeElement);
        memeElements.push(memeElement);
    } else if (meowCount === 5) {
        // Заполнение правой половины экрана
        const memeElement = document.createElement('img');
        memeElement.src = memeImgSrc;
        memeElement.classList.add('half-width', 'right-half');
        document.body.appendChild(memeElement);
        memeElements.push(memeElement);
    } else if (meowCount === 6) {
        // Заполнение всей ширины экрана по высоте
        const memeElement = memeElements[0];
        memeElement.classList.add('half-height');
        memeElement.style.left = '0';
        memeElement.style.top = '0';
    } else if (meowCount === 7) {
        // Заполнение всего экрана
        const memeElement = document.createElement('img');
        memeElement.src = memeImgSrc;
        memeElement.classList.add('full-screen');
        document.body.appendChild(memeElement);
        memeElements.push(memeElement);
    } else if (meowCount === maxMeowCount - 1) {
        // Сброс страницы после 9-го нажатия
        resetPage();
    }
    meowCount++;
});

function resetPage() {
    meowCount = -1;
    // Очистка всех звуковых объектов
    if (lastMemeAudio) {
        lastMemeAudio.pause();
        lastMemeAudio.src = '';
        lastMemeAudio = null;
    }
    // Удаление всех "Мем" изображений
    memeElements.forEach(meme => meme.remove());
    memeElements = [];
    // Остановка и сброс всех видео
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    // Восстановление исходного состояния видео
    document.querySelectorAll('.video-wrapper').forEach((wrapper, index) => {
        wrapper.innerHTML = `<video src="video${index + 1}.mp4" controls></video>`;
        const video = wrapper.querySelector('video');
        video.pause(); // Отключаем автоматическое воспроизведение
        video.currentTime = 0; // Сбрасываем текущее время видео
    });
}
