class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const number = this.getAttribute('number');
        const ball = document.createElement('div');
        ball.textContent = number;

        const style = document.createElement('style');
        style.textContent = `
            div {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.25rem;
                font-weight: 800;
                color: white;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                background: ${this.getGradient(number)};
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                opacity: 0;
                transform: scale(0.5);
            }

            @keyframes popIn {
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(ball);
    }

    getGradient(number) {
        const num = parseInt(number);
        if (num <= 10) return 'linear-gradient(135deg, #facc15, #eab308)'; // Yellow
        if (num <= 20) return 'linear-gradient(135deg, #60a5fa, #2563eb)'; // Blue
        if (num <= 30) return 'linear-gradient(135deg, #f87171, #dc2626)'; // Red
        if (num <= 40) return 'linear-gradient(135deg, #4ade80, #16a34a)'; // Green
        return 'linear-gradient(135deg, #c084fc, #9333ea)'; // Purple
    }
}

customElements.define('lotto-ball', LottoBall);

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
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    
    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            lottoNumbersContainer.appendChild(lottoBall);
        }, index * 100); // Staggered animation
    });
});
