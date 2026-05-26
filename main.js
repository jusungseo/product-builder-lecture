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
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5em;
                font-weight: bold;
                color: white;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                background-color: ${this.getColor(number)};
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(ball);
    }

    getColor(number) {
        const num = parseInt(number);
        if (num <= 10) return '#f1c40f'; // Yellow
        if (num <= 20) return '#3498db'; // Blue
        if (num <= 30) return '#e74c3c'; // Red
        if (num <= 40) return '#2ecc71'; // Green
        return '#9b59b6'; // Purple
    }
}

customElements.define('lotto-ball', LottoBall);

document.getElementById('generator-btn').addEventListener('click', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers-container');
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    for (const number of Array.from(numbers).sort((a, b) => a - b)) {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoBall);
    }
});
