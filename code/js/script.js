const metricRadio = document.getElementById('metric'),
      imperialRadio = document.getElementById('imperial'),
      heightDiv = document.querySelector('#height div'),
      weightDiv = document.querySelector('#weight div'),
      cmInput = document.querySelector('#cm input'),
      ftInput = document.querySelector('#ft input'),
      inInput = document.querySelector('#in input'),
      kgInput = document.querySelector('#kg input'),
      stInput = document.querySelector('#st input'),
      lbsInput = document.querySelector('#lbs input'),
      bmiScoreText = document.getElementById('bmi-score'),
      bmiStatus = document.getElementById('status'),
      idealRange = document.getElementById('ideal-range');

const CM_TO_M_FACTOR = 0.01,
      IN_TO_M_FACTOR = 0.0254,
      LBS_TO_KG_FACTOR = 0.4536,
      STONE_TO_LBS_FACTOR = 14;

// Define function to calculate BMI score
function calculateBmiScore(weight, height) {
    return weight / (height * height);
}

// Define function to convert metric height to meters
function convertMetricHeightToMeters(cm) {
    return cm * CM_TO_M_FACTOR;
}

// Define function to convert imperial height to meters
function convertImperialHeightToMeters(ft, inches) {
    const totalInches = ft * 12 + inches;
    return totalInches * IN_TO_M_FACTOR;
}

// Define function to convert imperial weight to pounds
function convertImperialWeightToKg(stone, lbs) {
    const totalLbs = stone * STONE_TO_LBS_FACTOR + lbs;
    return totalLbs * LBS_TO_KG_FACTOR;
}

// Add event listeners for radio buttons
metricRadio.addEventListener('click', () => {
    // Show metric inputs, hide imperial inputs
    document.querySelector('#height #ft').style.display = 'none';
    document.querySelector('#height #in').style.display = 'none';
    document.querySelector('#weight #st').style.display = 'none';
    document.querySelector('#weight #lbs').style.display = 'none';
    document.querySelector('#height #cm').style.display = 'flex';
    document.querySelector('#weight #kg').style.display = 'flex';
});

imperialRadio.addEventListener('click', () => {
    // Show imperial inputs, hide metric inputs
    heightDiv.style.display = 'flex';
    weightDiv.style.display = 'flex';
    document.querySelector('#height #ft').style.display = 'flex';
    document.querySelector('#height #in').style.display = 'flex';
    document.querySelector('#weight #st').style.display = 'flex';
    document.querySelector('#weight #lbs').style.display = 'flex';
    document.querySelector('#height #cm').style.display = 'none';
    document.querySelector('#weight #kg').style.display = 'none';
});

// Add event listener for all inputs
document.querySelectorAll('input').forEach(input => {
   input.addEventListener('input', () => {
       let weight;
       let height;

       if (metricRadio.checked) {
           // Calculate BMI score using metric units
           weight = Number(kgInput.value);
           height = convertMetricHeightToMeters(Number(cmInput.value));
       } else {
           // Calculate BMI score using imperial units
           weight = convertImperialWeightToKg(Number(stInput.value), Number(lbsInput.value));
           height = convertImperialHeightToMeters(Number(ftInput.value), Number(inInput.value));
       }

       const bmiScoreValue = calculateBmiScore(weight, height);
       
       bmiScoreText.textContent= bmiScoreValue.toFixed(1);
       
       const idealWeightLower = (18.5 * height * height).toFixed(1);
       const idealWeightUpper = (24.9 * height * height).toFixed(1);

       if (Number(bmiScoreText.textContent) < 18.5) {
            bmiStatus.textContent = 'an underweight';
       } else if (Number(bmiScoreText.textContent) >= 18.5 && Number(bmiScoreText.textContent) <= 24.9) {
            bmiStatus.textContent = 'a healthy weight';
       } else if (Number(bmiScoreText.textContent) >= 25.0 && Number(bmiScoreText.textContent) <= 29.9) {
            bmiStatus.textContent = 'an overweight';
       } else {
            bmiStatus.textContent = 'an obese';
       }

       idealRange.textContent = `${idealWeightLower}kg - ${idealWeightUpper}kg`;
       
   });
});



