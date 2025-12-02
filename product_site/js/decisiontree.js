// keely fowler - hw 8, oct.25,25
// File: js/mindracer.js
//  decision tree script for activity suggestions

// get elements
var energySelect = document.getElementById('energyLevel');
var timeSelect = document.getElementById('timeAvailable');
var getSuggestionBtn = document.getElementById('getSuggestionBtn');
var resultDiv = document.getElementById('suggestionResult');
var suggestionText = document.getElementById('activitySuggestion');
var allLabels = document.getElementsByClassName('content-box');
var allParagraphs = document.getElementsByTagName('p');
var firstHeading = document.querySelector('h1');

// customize form elements
var savePrefsBtn = document.querySelector('#treeCustomizer button');
var treeNameInput = document.getElementById('tree-name');
var customizeHeading = document.querySelector('.card-right h2');

// meditation section elements
var meditationSection = document.getElementById('meditationSection');
var meditationHeading = document.getElementById('meditationHeading');

// function to calculate activity score
function calculateScore(energy, time) {
    var energyScore = 0;
    var timeScore = 0;
    
    // assign scores for energy
    if (energy === 'high') {
        energyScore = 2;
    } else if (energy === 'medium') {
        energyScore = 1;
    } else if (energy === 'low') {
        energyScore = 0;
    }
    
    // assign scores for time
    if (time === 'lots') {
        timeScore = 2;
    } else if (time === 'some') {
        timeScore = 1;
    } else if (time === 'little') {
        timeScore = 0;
    }
    
    // add them together
    var totalScore = energyScore + timeScore;
    return totalScore;
}

// function to get activity suggestion based on score
function getSuggestion(score) {
    var activity = '';
    
    if (score === 4) {
        activity = 'go for a run or hit the gym! this is a productive way to keep your energy up';
    } else if (score === 3) {
        activity = 'try a creative project or go for a nice walk outside!';
    } else if (score === 2) {
        activity = 'journaling or listening to music sounds perfect for you right now';
    } else if (score === 1) {
        activity = 'take a short walk or do some light stretching';
    } else {
        activity = 'rest and meditate. give yourself grace and just chill today';
    }
    
    return activity;
}

// function to save preferences
function savePreferences() {
    var treeName = treeNameInput.value;
    
    // use textContent to update heading
    if (treeName !== '') {
        customizeHeading.textContent = 'your tree: ' + treeName;
    } else {
        customizeHeading.textContent = 'preferences saved!';
    }
    
    // change form background to show it saved
    var rightCard = document.querySelector('.card-right');
    rightCard.style.backgroundColor = '#d4e8d4';
}


// get all action buttons and disable them initially
var actionButtons = document.getElementsByClassName('action-btn');
for (var i = 0; i < actionButtons.length; i++) {
    actionButtons[i].style.opacity = '0.3';
    actionButtons[i].disabled = true;
}

// button click event for getting suggestion
getSuggestionBtn.addEventListener('click', function() {
    firstHeading.textContent = 'MindRacer Activity Finder';

    var energy = energySelect.value;
    var time = timeSelect.value;
    
    // check if both are selected
    if (energy === '' || time === '') {
        alert('please select both options!');
        return;
    }
    
    // calculate score
    var score = calculateScore(energy, time);
    
    // change background based on energy level
    var contentBox = document.querySelector('.content-box');
    if (energy === 'high') {
        contentBox.style.backgroundColor = '#c9cd9eff';
    } else if (energy === 'medium') {
        contentBox.style.backgroundColor = '#d4dac0';
    } else if (energy === 'low') {
        contentBox.style.backgroundColor = '#bccbc8ff';
    }

    // get suggestion
    var suggestion = getSuggestion(score);
    
    // update page with innerHTML to add formatting
    suggestionText.innerHTML = '<strong>' + suggestion + '</strong>';


    // show meditation video only for low energy
    if (energy === 'low') {
        meditationHeading.innerHTML = "feeling low energy? take a moment to meditate";
        meditationSection.style.display = 'block';
    } else {
        meditationSection.style.display = 'none';
    }

    // show result
    resultDiv.style.display = 'block';

    // use querySelectorAll to loop all labels
    var allLabelsList = document.querySelectorAll('#decisionTreeForm label');
    for (var i = 0; i < allLabelsList.length; i++) {
        allLabelsList[i].style.textDecoration = 'line-through';
        allLabelsList[i].style.opacity = '0.6'; 
    }


    for (var i = 0; i < actionButtons.length; i++) {
        actionButtons[i].style.opacity = '1';
        actionButtons[i].disabled = false;
    }

}
);

// button click event for saving preferences
savePrefsBtn.addEventListener('click', savePreferences);

// reset form
var resetBtn = document.getElementById('resetBtn');

resetBtn.addEventListener('click', function() {
    // reset the form fields, looked this up 
    document.getElementById('decisionTreeForm').reset();

    // hide results & meditation
    resultDiv.style.display = 'none';
    meditationSection.style.display = 'none';

    // clear suggest. txt
    suggestionText.textContent = '';

    // restore heading/bg
    firstHeading.textContent = "MindRacer's Decision Tree:";
    document.querySelector('.content-box').style.backgroundColor = '#dfe6cf';

    // remove label strikethroughs
    var allLabelsList = document.querySelectorAll('#decisionTreeForm label');
    for (var i = 0; i < allLabelsList.length; i++) {
        allLabelsList[i].style.textDecoration = 'none';
        allLabelsList[i].style.opacity = '1';
    }

    // disable action buttons again

    var allButtons = document.querySelectorAll('.button-group button');
    
    for (var i = 0; i < allButtons.length; i++) {
        if (allButtons[i].id === "resetBtn") {
            // reset stays active
            allButtons[i].disabled = false;
            allButtons[i].style.opacity = "1";
        } else if (allButtons[i].id === "moreBtn") {
            // more suggestions stays active AND unblurred
            allButtons[i].disabled = false;
            allButtons[i].style.opacity = "1";
        } else {
            // anything else gets disabled (if you ever add more buttons)
            allButtons[i].disabled = true;
            allButtons[i].style.opacity = "0.3";
        }
    }
});

