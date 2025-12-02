assignment 11: events
keely fowler - 11/15/25

a. describe your event

i'm adding form validation feedback to the decision tree dropdowns. when users interact with the energy and time dropdowns, they'll get real-time feedback about what to select and whether their selection is valid.

the element: the two dropdown menus (energyLevel and timeAvailable)

the events:
-> focus: when user clicks into a dropdown, show a helpful message
-> blur: when user leaves a dropdown, check if they selected something valid
-> submit: when the form is submitted (though we prevent default), confirm their choices were recorded

 behavior: display helpful hints when they focus on dropdowns, show error messages if they leave without selecting, and confirm successful submission.

this helps users with decision paralysis by guiding them through the selection process step by step, which fits perfectly with mindracer's purpose.

b. event handling flowchart

see: fowler_events_flowchart.png (in this folder)