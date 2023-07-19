document.onkeydown = function () {
    if (window.keyCode == '13') {
         calculateBMI();
    }
}

const weight = document.getElementById('weight'),
    weightImperial = document.getElementById('weight-imperial'),
    height = document.getElementById('height'),
    heightInches = document.getElementById('height-inches'),
    heightFeet = document.getElementById('height-feet');

function calculateBMI() {
    if (!isMetric) {
        const lbsToKg = weightImperial.value * .45359237;
        let feetToInches = Number(heightFeet.value) * 12;
        let totalInches = feetToInches + Number(heightInches.value);
        console.log('Total inches: ' + totalInches);
        
        const heightImperial = totalInches / .39370;
        console.log(heightImperial);
        
        if (validate(weightImperial, heightFeet, heightInches)) {
            calculate(lbsToKg, heightImperial);
        }
    } 
    else if (isMetric || document.getElementById('imperial').style.display === 'none') {
        console.log('Its metric!');
        if (validate(weight, height)) {
            calculate(weight, height);
        }
    }
};

function calculate(weight, height) {
    const results = document.getElementById('results'),
        resultsHeight = document.getElementById('results-height'),
        resultsWeight = document.getElementById('results-weight'),
        resultsBMI = document.getElementById('results-bmi'),
        resultsCat = document.getElementById('results-cat'),
        circle = document.querySelector('.colored-circle');
    let inches;
    
    if (isMetric) {
        BMI = weight.value / (height.value * height.value);
    } 
    else {
        BMI = weight / (height * height);
    }
    
    BMI = (BMI * 10000).toFixed(2);
    
    results.style.display = "flex";
    
    if (BMI < 16) {
        circle.style.backgroundColor = "red";
        category = 'Extremely Underweight';
    } else if (BMI >= 16.0 && BMI <= 16.99) {
        circle.style.backgroundColor = "orange";
        category = 'Underweight';
    } else if (BMI >= 17 && BMI <= 18.49) {
        circle.style.backgroundColor = "yellow";
        category = 'Slightly Underweight';
    } else if (BMI >= 18.5 && BMI <= 24.9) {
        circle.style.backgroundColor = "green";
        category = 'Healthy Weight';
    } else if (BMI > 24.9 && BMI <= 29.9) {
        circle.style.backgroundColor = "yellow";
        category = 'Slightly Overweight';
    } else if (BMI > 29.9 && BMI <= 34.9) {
        circle.style.backgroundColor = "orange";
        category = 'Overweight';
    } else {
        circle.style.backgroundColor = "red";
        category = 'Extremely Overweight';
    }

    if (isMetric) {
        resultsBMI.innerText = BMI;
        resultsHeight.innerText = `${height.value}cm`; // if statement for this reason
        resultsWeight.innerText = `${weight.value}kg`;
        resultsCat.innerText = category;
    } else {
        if (heightInches.value == '') {
            inches = 0;
        } else {
            inches = heightInches.value;
        }
        
        resultsBMI.innerText = BMI;
        resultsHeight.innerText = `${heightFeet.value}ft ${inches}in`;
        resultsWeight.innerText = `${weightImperial.value}lbs`;
        resultsCat.innerText = category;
    }
}

function validate(weight, height, inches) {
    
    const errorMsgWrap = document.getElementById('error-msg-wrap');
    const errorMsgText = document.getElementById('error-msg-txt');
    
    function clearError() {
        errorMsgWrap.style.display = 'none';
    }

    if (isMetric) {
        if (weight.value === '' || isNaN(weight.value) || weight.value < 1 || weight.value > 600) {
            weight.focus();
            errorMsg = 'Please fill in the weight field. Must be a valid number.';
            validData = false;

            errorMsgWrap.style.display = "block";
            errorMsgText.innerText = errorMsg;

            setTimeout(clearError, 3000);
            return;
        } else if (height.value === '' || isNaN(height.value) || height.value < 1 || height.value > 600) {
            height.focus();
            errorMsg = 'Please fill in the height field. Must be a valid number.';
            validData = false;
            
            errorMsgWrap.style.display = "block";
            errorMsgText.innerText = errorMsg;
            
            setTimeout(clearError, 3000);
            return;
        } else {
            validData = true;
        }
    } else {
        if (weight.value === '' || isNaN(weight.value) || weight.value < 1 || weight.value > 600) {
            weight.focus();
            errorMsg = 'Please fill in the weight field. Must be a valid number.';
            validData = false;
            
            errorMsgWrap.style.display = "block";
            errorMsgText.innerText = errorMsg;
            
            setTimeout(clearError, 3000);
            return;
        } else if (height.value === '' || isNaN(height.value) || height.value < 1 || height.value > 600) {
            console.log('this was put in the height field: ' + height.value);
            errorMsg = 'Please fill in the feet field. Must be a valid number.';
            validData = false;

            errorMsgWrap.style.display = "block";
            errorMsgText.innerText = errorMsg;

            setTimeout(clearError, 3000);
            return;
        } else if (inches !== undefined) {
            console.log('should be metric');
            if (isNaN(inches.value)) {
                errorMsg = 'The inches field must be a number';
                validData = false;
                
                errorMsgWrap.style.display = "block";
                errorMsgText.innerText = errorMsg;
                
                setTimeout(clearError, 3000);
                return;
            }
        } else {
            validData = true;
        }
    }
    return validData;
}
let isMetric = true;
function switchToImperial() {
    imperial = document.getElementById('imperial');
    metric = document.getElementById('metric');

    metric.style.display = 'none';
    imperial.style.display = 'block';
    imperial.style.animation = 'fadeIn 500ms linear';
    isMetric = false;

    console.log(isMetric);
}

function switchToMetric() {
    imperial = document.getElementById('imperial');
    metric = document.getElementById('metric');

    metric.style.display = 'block';
    metric.style.animation = 'fadeIn 800ms linear';
    imperial.style.display = 'none';

    isMetric = true;
}