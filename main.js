class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['number', 'bonus'];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const number = this.getAttribute('number') || '?';
        const isBonus = this.hasAttribute('bonus');
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    margin: 5px;
                }
                .ball {
                    width: 55px;
                    height: 55px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: white; /* Force white text */
                    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
                    background: ${isBonus ? 'linear-gradient(135deg, #fb7185, #e11d48)' : this.getGradient(number)};
                    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                    opacity: 0;
                    transform: scale(0.5);
                    position: relative;
                }

                @keyframes popIn {
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .label {
                    position: absolute;
                    top: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 0.65rem;
                    background: #e11d48;
                    color: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 700;
                    white-space: nowrap;
                    display: ${isBonus ? 'block' : 'none'};
                }
            </style>
            <div class="ball">
                <span class="label">BONUS</span>
                ${number}
            </div>
        `;
    }

    getGradient(number) {
        const num = parseInt(number);
        if (num <= 10) return 'linear-gradient(135deg, #fbbf24, #d97706)'; // Yellow
        if (num <= 20) return 'linear-gradient(135deg, #60a5fa, #2563eb)'; // Blue
        if (num <= 30) return 'linear-gradient(135deg, #f87171, #dc2626)'; // Red
        if (num <= 40) return 'linear-gradient(135deg, #4ade80, #16a34a)'; // Green
        return 'linear-gradient(135deg, #a78bfa, #7c3aed)'; // Purple
    }
}

if (!customElements.get('lotto-ball')) {
    customElements.define('lotto-ball', LottoBall);
}

// Theme Management
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

themeBtn.addEventListener('click', () => {
    const isLight = body.getAttribute('data-theme') === 'light';
    body.setAttribute('data-theme', isLight ? 'dark' : 'light');
    themeBtn.textContent = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';
});

// Navigation Logic
const landingScreen = document.getElementById('landing-screen');
const generatorScreen = document.getElementById('generator-screen');
const enterBtn = document.getElementById('enter-btn');
const backBtn = document.getElementById('back-btn');

enterBtn.addEventListener('click', () => {
    landingScreen.classList.add('hidden');
    generatorScreen.classList.remove('hidden');
});

backBtn.addEventListener('click', () => {
    generatorScreen.classList.add('hidden');
    landingScreen.classList.remove('hidden');
});

// Generator Logic
const generatorBtn = document.getElementById('generator-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers-container');

generatorBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    
    const numbersSet = new Set();
    while (numbersSet.size < 7) {
        numbersSet.add(Math.floor(Math.random() * 45) + 1);
    }

    const allNumbers = Array.from(numbersSet);
    const mainNumbers = allNumbers.slice(0, 6).sort((a, b) => a - b);
    const bonusNumber = allNumbers[6];
    
    mainNumbers.forEach((number, index) => {
        setTimeout(() => {
            const ball = document.createElement('lotto-ball');
            ball.setAttribute('number', number);
            lottoNumbersContainer.appendChild(ball);
        }, index * 100);
    });

    setTimeout(() => {
        const plus = document.createElement('span');
        plus.className = 'plus-sign';
        plus.textContent = '+';
        lottoNumbersContainer.appendChild(plus);

        const bonusBall = document.createElement('lotto-ball');
        bonusBall.setAttribute('number', bonusNumber);
        bonusBall.setAttribute('bonus', '');
        lottoNumbersContainer.appendChild(bonusBall);
    }, 6 * 100 + 200);
});
