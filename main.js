/**
 * Animal Face Test - Core Logic
 * Uses Teachable Machine Image Model to classify user photos.
 */

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/arJGmo0PU/";

let model;
let maxPredictions;

/**
 * UI Element Selectors
 */
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const actionGroup = document.getElementById('action-group');
const uploadSection = document.getElementById('upload-section');
const loadingSection = document.getElementById('loading-section');
const resultSection = document.getElementById('result-section');
const labelContainer = document.getElementById('label-container');
const resultTitle = document.getElementById('result-title');
const resultDesc = document.getElementById('result-desc');

/**
 * Animal Traits Mapping
 */
const ANIMAL_TRAITS = {
    'dog': {
        title: '친근한 강아지상',
        desc: '다정다감하고 에너지가 넘치는 당신! 주변 사람들에게 긍정적인 에너지를 주는 매력 넘치는 스타일이군요.'
    },
    'cat': {
        title: '도도한 고양이상',
        desc: '차분하면서도 신비로운 분위기를 가진 당신! 처음엔 낯을 가릴지 몰라도 알면 알수록 깊은 매력을 가진 스타일이군요.'
    },
    'default': {
        title: '신비로운 동물상',
        desc: '다양한 매력이 공존하는 특별한 관상을 가지고 계시네요!'
    }
};

/**
 * Initialize the application
 */
async function init() {
    try {
        const modelURL = MODEL_URL + "model.json";
        const metadataURL = MODEL_URL + "metadata.json";

        // Load the model
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        console.log("Model loaded successfully.");
    } catch (error) {
        console.error("Error loading model:", error);
        alert("모델을 불러오는 중 오류가 발생했습니다. 페이지를 새로고침 해주세요.");
    }
}

/**
 * Handle File Upload
 */
function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.classList.remove('hidden');
        actionGroup.classList.remove('hidden');
        document.querySelector('.upload-content').classList.add('hidden');
    };
    reader.readAsDataURL(file);
}

/**
 * Run Prediction
 */
async function predict() {
    if (!model) {
        alert("모델이 아직 준비되지 않았습니다. 잠시만 기다려주세요.");
        return;
    }

    // Show loading
    uploadSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');

    try {
        // Run model prediction
        const prediction = await model.predict(imagePreview);
        
        // Sort by probability
        prediction.sort((a, b) => b.probability - a.probability);

        // Update UI with results
        renderResults(prediction);
    } catch (error) {
        console.error("Prediction error:", error);
        alert("분석 중 오류가 발생했습니다.");
        resetApp();
    }
}

/**
 * Render Results to UI
 */
function renderResults(predictions) {
    loadingSection.classList.add('hidden');
    resultSection.classList.remove('hidden');

    labelContainer.innerHTML = '';
    
    // Top prediction for title/desc
    const topResult = predictions[0];
    const className = topResult.className.toLowerCase();
    const trait = ANIMAL_TRAITS[className] || ANIMAL_TRAITS.default;

    resultTitle.textContent = `당신은 ${trait.title}!`;
    resultDesc.textContent = trait.desc;

    // Build charts
    predictions.forEach(p => {
        const percentage = (p.probability * 100).toFixed(0);
        const chartItem = document.createElement('div');
        chartItem.className = 'chart-item';
        
        chartItem.innerHTML = `
            <div class="label-info">
                <span>${p.className}</span>
                <span>${percentage}%</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: 0%"></div>
            </div>
        `;
        
        labelContainer.appendChild(chartItem);
        
        // Animate bar after a small delay
        setTimeout(() => {
            chartItem.querySelector('.progress-bar').style.width = `${percentage}%`;
        }, 100);
    });
}

/**
 * Reset application state
 */
function resetApp() {
    resultSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    uploadSection.classList.remove('hidden');
    
    // Clear upload area
    imagePreview.classList.add('hidden');
    imagePreview.src = '';
    actionGroup.classList.add('hidden');
    document.querySelector('.upload-content').classList.remove('hidden');
    fileInput.value = '';
}

/**
 * Event Listeners
 */
uploadZone.addEventListener('click', () => fileInput.click());

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.style.borderColor = 'var(--accent-color)';
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.style.borderColor = 'oklch(0% 0 0 / 0.1)';
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.style.borderColor = 'oklch(0% 0 0 / 0.1)';
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

fileInput.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
});

document.getElementById('analyze-btn').addEventListener('click', predict);
document.getElementById('retry-btn').addEventListener('click', resetApp);
document.getElementById('restart-btn').addEventListener('click', resetApp);

// Start initialization
init();
