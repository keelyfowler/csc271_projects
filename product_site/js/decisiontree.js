// keely fowler - hw 10, nov.9,25
// AI disclaimer - had help debugging and figuring out how to build an algorithm to approach solving diff problems & 
// adding features that were difficult for me to break down into modular probs 
// decision tree script for mindracer activity suggestions
// uses conditionals, loops, and logical operators to suggest activities based on user's energy & time

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

// array storing all possible activities with their energy and time requirements
// so site can filter / display suggestions re: user input
// array of all possible activities with their requirements
var allActivities = [

    // high energy + lots of time

    {activity: 'go for a run or hit the gym! this is a productive way to keep your energy up', energy: 'high', time: 'lots'},
    {activity: 'try a new workout class or go rock climbing', energy: 'high', time: 'lots'},
    {activity: 'go for a long bike ride or hike a challenging trail', energy: 'high', time: 'lots'},
    
    // high energy + some time

    {activity: 'try a creative project or go for a nice walk outside!', energy: 'high', time: 'some'},
    {activity: 'do some gardening or organize a space in your home', energy: 'high', time: 'some'},
    {activity: 'cook a new recipe or play an active game', energy: 'high', time: 'some'},
    
    // high energy + little time

    {activity: 'take a short walk or do some light stretching', energy: 'high', time: 'little'},
    {activity: 'do a quick workout video or dance to your favorite song', energy: 'high', time: 'little'},
    {activity: 'tidy up your space or do jumping jacks', energy: 'high', time: 'little'},
    
    // medium energy + lots of time

    {activity: 'try a creative project or go for a nice walk outside!', energy: 'medium', time: 'lots'},
    {activity: 'read a book or watch a documentary', energy: 'medium', time: 'lots'},
    {activity: 'start a craft project or reorganize your room', energy: 'medium', time: 'lots'},
    
    // medium energy + some time

    {activity: 'journaling or listening to music sounds perfect for you right now', energy: 'medium', time: 'some'},
    {activity: 'do some coloring or doodling', energy: 'medium', time: 'some'},
    {activity: 'call a friend or take a leisurely walk', energy: 'medium', time: 'some'},
    
    // medium energy /little time

    {activity: 'take a short walk or do some light stretching', energy: 'medium', time: 'little'},
    {activity: 'make yourself tea and sit outside', energy: 'medium', time: 'little'},
    {activity: 'listen to a favorite song or quick meditation', energy: 'medium', time: 'little'},
    
    // low energy/lots of time

    {activity: 'rest and meditate. give yourself grace and just chill today', energy: 'low', time: 'lots'},
    {activity: 'watch your comfort show or movie and relax', energy: 'low', time: 'lots'},
    {activity: 'take a long nap or do gentle yoga', energy: 'low', time: 'lots'},
    
    // low energy + some time

    {activity: 'rest and meditate. give yourself grace and just chill today', energy: 'low', time: 'some'},
    {activity: 'lay down and listen to calming music', energy: 'low', time: 'some'},
    {activity: 'do some light reading or scroll through calming content', energy: 'low', time: 'some'},
    
    // low energy + little time

    {activity: 'rest and meditate. give yourself grace and just chill today', energy: 'low', time: 'little'},
    {activity: 'close your eyes and take some deep breaths', energy: 'low', time: 'little'},
    {activity: 'make yourself comfortable and rest for a few minutes', energy: 'low', time: 'little'}
];

var moreSuggestionsSection = document.getElementById('moreSuggestionsSection');
var suggestionsList = document.getElementById('suggestionsList');

// checks if user has selected both energy && time options
// returns true if both are selected, false otherwise
function validateSelections() {
    var energy = energySelect.value;
    var time = timeSelect.value;
    
    if (energy === '' || time === '') {
        return false;
    }
    return true;
}

// updates background color of element based on energy level
// parameters: energy (string) - user's energy level, element (dom node) -> element to update
function updateUIColors(energy, element) {
    if (energy === 'high') {
        element.style.backgroundColor = '#c9cd9eff';
    } else if (energy === 'medium') {
        element.style.backgroundColor = '#d4dac0';
    } else if (energy === 'low') {
        element.style.backgroundColor = '#bccbc8ff';
    }
}

// filters activities array per energy, time
//  optionally excludes an activity
// parameters: energy (string), time (string), excludeActivity (string, optional)
// returns: array of matching activity strings
function filterActivities(energy, time, excludeActivity) {
    var matchingActivities = [];
    
    for (var i = 0; i < allActivities.length; i++) {
        var activity = allActivities[i];
        var matches = activity.energy === energy && activity.time === time;
        var notExcluded = !excludeActivity || activity.activity !== excludeActivity;
        
        if (matches && notExcluded) {
            matchingActivities.push(activity.activity);
        }
    }
    
    return matchingActivities;
}
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

// filters activities matching user's energy and time selection
// returns a random activity from matching options
// uses filterActivities helper function
function getSuggestion(score) {
    var energy = energySelect.value;
    var time = timeSelect.value;
    
    // use helper function to filter activities
    var matchingActivities = filterActivities(energy, time);
    
    // pick a random activity from matches
    if (matchingActivities.length > 0) {
        var randomIndex = Math.floor(Math.random() * matchingActivities.length);
        return matchingActivities[randomIndex];
    }
    
    return 'take a moment to breathe and reset';
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

// resets the entire form and hides all result sections
// basic function with no parameters or return value
function resetForm() {

    // reset the form fields
    document.getElementById('decisionTreeForm').reset();

    // hide results & meditation & more suggestions
    resultDiv.style.display = 'none';
    meditationSection.style.display = 'none';
    moreSuggestionsSection.style.display = 'none';

    // clear suggestion text
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
            allButtons[i].disabled = false;
            allButtons[i].style.opacity = "1";
        } else if (allButtons[i].id === "moreBtn") {
            allButtons[i].disabled = false;
            allButtons[i].style.opacity = "1";
        } else {
            allButtons[i].disabled = true;
            allButtons[i].style.opacity = "0.3";
        }
    }
}

// displays additional activity suggestions when "more suggestions" button is clicked
// uses while loop with logical operators (&& to check energy AND time AND not current suggestion)
// loops through nodelist with .length-> style list items
// function to show more suggestions based on users energy / time
function showMoreSuggestions() {
    var energy = energySelect.value;
    var time = timeSelect.value;
    var currentSuggestion = suggestionText.textContent;
    
    // check if user has made selections
    if (!validateSelections()) {
        alert('please get a suggestion first!');
        return;
    }
    
    // show the current suggestion showing
    var currentSuggestion = suggestionText.textContent;
    
    // clear last list
    suggestionsList.innerHTML = '';
    
    // use helper function to filter activities, excluding current one
    var matchingActivities = filterActivities(energy, time, currentSuggestion);
    
    // use for loop to create list items
    for (var j = 0; j < matchingActivities.length; j++) {
        var listItem = document.createElement('li');
        listItem.textContent = matchingActivities[j];
        suggestionsList.appendChild(listItem);
    }
    
    // show the section
    moreSuggestionsSection.style.display = 'block';
    
    // use querySelectorAll and loop through nodelist
    var allListItems = suggestionsList.querySelectorAll('li');
    if (allListItems.length > 0) {
        for (var k = 0; k < allListItems.length; k++) {
            allListItems[k].style.color = '#914040';
            allListItems[k].style.marginBottom = '10px';
        }
    }
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
    if (!validateSelections()) {
        alert('please select both options!');
        return;
    }
    
    // calculate score
    var score = calculateScore(energy, time);
    
    // use helper function to update background color
    var contentBox = document.querySelector('.content-box');
    updateUIColors(energy, contentBox);

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

resetBtn.addEventListener('click', resetForm);

// event listener for more suggestions button
var moreBtn = document.getElementById('moreBtn');
moreBtn.addEventListener('click', showMoreSuggestions);


// assignment 11: form event handling

// provides current feedback when users interact w/ dropdowns
// focus events show helpful hints & blur events validate selections
// get form feedback element
var formFeedback = document.getElementById('formFeedback');

// focus event - show helpful message when user clicks in dropdown
energySelect.addEventListener('focus', function() {
    formFeedback.textContent = 'select your current energy level to get personalized suggestions';
    formFeedback.style.color = '#4B5320';
    formFeedback.style.display = 'block';
});

timeSelect.addEventListener('focus', function() {
    formFeedback.textContent = 'select how much time you have available';
    formFeedback.style.color = '#4B5320';
    formFeedback.style.display = 'block';
});

// blur event - check if valid when user leaves dropdown
energySelect.addEventListener('blur', function() {
    if (energySelect.value === '') {
        formFeedback.textContent = 'please select an energy level before continuing';
        formFeedback.style.color = '#914040';
        formFeedback.style.display = 'block';
    } else {
        formFeedback.style.display = 'none';
    }
});

timeSelect.addEventListener('blur', function() {
    if (timeSelect.value === '') {
        formFeedback.textContent = 'please select how much time you have';
        formFeedback.style.color = '#914040';
        formFeedback.style.display = 'block';
    } else {
        formFeedback.style.display = 'none';
    }
});