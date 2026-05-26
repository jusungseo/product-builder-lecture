class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const number = this.getAttribute('number');
        const isBonus = this.hasAttribute('bonus');
        const ball = document.createElement('div');
        ball.textContent = number;

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: inline-block;
            }
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
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
                background: ${isBonus ? 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' : this.getGradient(number)};
                border: ${isBonus ? '2px solid #fff' : 'none'};
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                opacity: 0;
                transform: scale(0.5);
                position: relative;
            }

            ${isBonus ? `
            div::after {
                content: 'BONUS';
                position: absolute;
                top: -15px;
                font-size: 0.6rem;
                background: #f87171;
                padding: 2px 6px;
                border-radius: 4px;
                letter-spacing: 0.05em;
            }
            ` : ''}

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
    
    // Generate 7 unique numbers
    const numbersSet = new Set();
    while (numbersSet.size < 7) {
        numbersSet.add(Math.floor(Math.random() * 45) + 1);
    }

    const allNumbers = Array.from(numbersSet);
    // Take first 6 as main numbers and sort them
    const mainNumbers = allNumbers.slice(0, 6).sort((a, b) => a - b);
    // Use the 7th as the bonus number
    const bonusNumber = allNumbers[6];
    
    // Combine for display (6 main + 1 bonus)
    mainNumbers.forEach((number, index) => {
        setTimeout(() => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            lottoNumbersContainer.appendChild(lottoBall);
        }, index * 150);
    });

    // Add bonus ball with a slight delay and a visual separator (plus sign)
    setTimeout(() => {
        const plusSign = document.createElement('span');
        plusSign.textContent = '+';
        plusSign.style.display = 'flex';
        plusSign.style.alignItems = 'center';
        plusSign.style.fontSize = '2rem';
        plusSign.style.margin = '0 10px';
        plusSign.style.color = '#94a3b8';
        lottoNumbersContainer.appendChild(plusSign);

        const bonusBall = document.createElement('lotto-ball');
        bonusBall.setAttribute('number', bonusNumber);
        bonusBall.setAttribute('bonus', '');
        lottoNumbersContainer.appendChild(bonusBall);
    }, 6 * 150 + 100);
});
