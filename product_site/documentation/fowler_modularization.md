assignment 10: script modularization
keely fowler - 12/1/25

a. identify reusable code

looking at my existing decisiontree.js script, i already have several functions but there's still some repeated code that could be modularized:

1. reset functionality - the reset button has a lot of inline code that could be a function
2. ui updates - code that changes colors, shows/hides sections gets repeated
3. activity filtering - the logic for matching activities appears in multiple places

b. plan your functions

functions to create/refactor:

1. resetForm() - basic function (no params, no return)
- what it does: resets the entire form and hides all result sections
- why: the reset button event listener has 20+ lines of code that can be extracted
- currently inline in the resetBtn event listener

2. updateUIColors(energy, element) - function with parameters
- what it does: updates background colors based on energy level
- parameters: energy level (string), element to update (dom element)
- why: color changing logic is repeated in multiple places
- makes it reusable for different elements

3. filterActivities(energy, time, excludeActivity) - function with parameters and return
- what it does: filters the activities array based on energy, time, and optionally excludes one activity
- parameters: energy (string), time (string), excludeActivity (string, optional)
- returns: array of matching activities
- why: this logic appears in both getSuggestion() and showMoreSuggestions()

c. new functions to add

i'm also adding a helper function to check if selections are valid:

validateSelections() - function that returns value
- checks if both energy and time dropdowns have values selected
- returns true/false
- makes validation reusable across multiple functions