function init() {

    function createSlider() {
        const sliderBox = document.querySelector('.slider-box')

        for (let i = 0; i < 10; i++) {
            const img = document.createElement('img')
            img.src = `img/img (${i + 1}).png`
            img.className = 'slider-item'
            sliderBox.append(img)
        }

        sliderBox.insertAdjacentHTML('beforeend',
            `<button class="btn-prev">&lt;</button>
            <button class="btn-next">&gt;</button>`
        )
    }
    createSlider()

    const imgs = Array.from(document.querySelectorAll('img'))

    imgs[0].setAttribute('style', 'opacity: 1; z-index: 1;')

    function changeSlide(ev) {
        const curImg = imgs.find(img => img.hasAttribute('style'))
        let nexImg

        if (ev === '+') {
            if (imgs.indexOf(curImg) === imgs.length - 1) {
                nextImg = imgs[0]
            } else {
                nextImg = curImg.nextElementSibling
            }
        } else if (ev === '-') {
            if (imgs.indexOf(curImg) === 0) {
                nextImg = imgs[imgs.length - 1]
            } else {
                nextImg = curImg.previousElementSibling
            }
        }

        curImg.removeAttribute('style')
        nextImg.setAttribute('style', 'opacity: 1; z-index: 1;')
    }

    const main = document.querySelector('main')

    const btnRead = main.querySelector('.btn-read')

    const btnSound = main.querySelector('.btn-sound')

    main.addEventListener('click', ev => {
        if (ev.target.className === 'btn-prev') {
            changeSlide('-')
        } else if (ev.target.className === 'btn-next') {
            changeSlide('+')
        } else if (ev.target === btnRead) {
            recognizeText()
        } else if (ev.target === btnSound) {
            startListening()
        }
    })

    document.addEventListener('keydown', ev => {
        if (ev.keyCode === 37) {
            changeSlide('-')
        } else if (ev.keyCode === 39) {
            changeSlide('+')
        }
    })

    const loader = document.querySelector('.loader')

    const btns = document.querySelectorAll('button')

    function recognizeText() {
        isChecked(btnRead)

        btns.forEach(btn => btn.disabled = true)

        const img = imgs.find(img => img.hasAttribute('style'))

        if (localStorage.getItem(`text${imgs.indexOf(img)}`) !== null) {
            const text = localStorage.getItem(`text${imgs.indexOf(img)}`)
            readText(text)
        } else {
            main.setAttribute('style', 'filter: blur(2px) contrast(80%);')
            loader.style.display = 'block'

            Tesseract.recognize(
                img,
                'rus'
            ).then(({
                data: {
                    text
                }
            }) => {
                main.removeAttribute('style')
                loader.style.display = 'none'

                text = text.replace(/\n/g, ' ').toLowerCase()
                console.log(text)

                localStorage.setItem(`text${imgs.indexOf(img)}`, text)

                readText(text)
            })
        }
    }

    function readText(text) {
        if ('speechSynthesis' in window) {
            const msg = new SpeechSynthesisUtterance()

            let voices = []

            getVoices()

            if (voices.length !== 0) {
                read()
            } else {
                speechSynthesis.addEventListener('voiceschanged', () => {
                    getVoices()
                    read()
                }, {
                    once: true
                })
            }

            function getVoices() {
                voices = speechSynthesis.getVoices()

                msg.voice = voices.find(voice => voice.name === 'Google русский')
            }


            function read() {
                if (btnSound.classList.contains('checked')) {
                    playable = false
                }
                msg.text = text
                speechSynthesis.speak(msg)
            }

            msg.addEventListener('end', () => {
                if (btnSound.classList.contains('checked')) {
                    recognition.start()
                    playable = true
                }

                isChecked(btnRead)

                btns.forEach(btn => btn.disabled = false)
            })
        } else {
            console.log('speechSynthesis не поддерживается')
        }
    }

    let recognition
    let playable

    function startListening() {
        isChecked(btnSound)

        window.SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition

        recognition = new window.SpeechRecognition()

        if (recognition === undefined) {
            console.log('SpeechRecognition не поддерживается')
        }

        if (btnSound.classList.contains('checked')) {
            recognition.start()
            playable = true
        } else {
            playable = false
        }

        recognition.addEventListener('result', ev => {
            speak(ev)
        })

        function speak(ev) {
            const word = ev.results[0][0]
                .transcript.toLowerCase()

            console.log(word)

            switch (word) {
                case 'читать':
                    recognizeText()
                    break;
                case 'стоп':
                    playable = false
                    isChecked(btnSound)
                    break;
                case 'вперед':
                    changeSlide('+')
                    break;
                case 'вперёд':
                    changeSlide('+')
                    break;
                case 'назад':
                    changeSlide('-')
                    break;
                default:
                    break;
            }
        }

        recognition.addEventListener('end', () => {
            if (playable) recognition.start()
        })
    }

    function isChecked(btn) {
        btn.classList.toggle('checked')
    }

    const btnGuide = document.querySelector('.btn-guide')

    btnGuide.addEventListener('click', () => {
        isChecked(btnGuide)

        const guide = document.querySelector('.guide')

        if (btnGuide.classList.contains('checked')) {
            guide.style.top = '0'
        } else {
            guide.style.top = '-226px'
        }
    })
}
init()