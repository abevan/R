document.addEventListener('DOMContentLoaded', () => {
  let mentalModels = [];
  let currentModel = null;
  let currentStepIndex = 0;

  const homeSection = document.getElementById('home');
  const contentSection = document.getElementById('content');
  const modelsList = document.getElementById('modelsList');
  const modelTitleEl = document.getElementById('modelTitle');
  const stepsContainer = document.getElementById('stepsContainer');
  const backButton = document.getElementById('backButton');
  const nextButton = document.getElementById('nextButton');
  const homeButton = document.getElementById('homeButton');
  const toggleModeButton = document.getElementById('toggleMode');

  toggleModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      mentalModels = data.models;
      renderModelsList();
    })
    .catch(error => console.error('Error loading data:', error));

  function renderModelsList() {
    modelsList.innerHTML = '';
    mentalModels.forEach(model => {
      const card = document.createElement('div');
      card.className = 'model-card';
      card.dataset.modelId = model.id;
      card.innerHTML = `<h3>${model.title}</h3>`;
      card.addEventListener('click', () => {
        currentModel = model;
        currentStepIndex = 0;
        loadStep();
        homeSection.classList.add('hidden');
        contentSection.classList.remove('hidden');
      });
      modelsList.appendChild(card);
    });
  }

  function loadStep() {
    stepsContainer.innerHTML = '';
    if (!currentModel) return;
    const step = currentModel.steps[currentStepIndex];
    const stepDiv = document.createElement('div');
    stepDiv.className = 'step';
    stepDiv.innerHTML = `<h3>${step.title}</h3><p>${step.content}</p>`;
    stepsContainer.appendChild(stepDiv);
    modelTitleEl.textContent = currentModel.title;
    updateNavigationButtons();
  }

  function updateNavigationButtons() {
    backButton.disabled = currentStepIndex === 0;
    nextButton.textContent =
      currentStepIndex === currentModel.steps.length - 1 ? 'Finish' : 'Next';
  }

  backButton.addEventListener('click', () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      loadStep();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentStepIndex < currentModel.steps.length - 1) {
      currentStepIndex++;
      loadStep();
    } else {
      contentSection.classList.add('hidden');
      homeSection.classList.remove('hidden');
    }
  });

  homeButton.addEventListener('click', () => {
    contentSection.classList.add('hidden');
    homeSection.classList.remove('hidden');
  });
});
