assignment 9: decision tree design
keely fowler - 12/1/25

a. decision tree description

my decision tree helps users on mindracer choose an activity when they're stuck and can't decide what to do. it lives on the decision builder page (decision_tree.html).

the user answers two questions:
1. how's your energy level? (high/medium/low)
2. how much time do you have? (lots/some/little)

based on their answers, the script suggests an activity that matches where they're at. if someone has high energy and lots of time, they'll get suggestions for physical stuff like running or hitting the gym. if they have low energy and little time, they're told to rest and meditate because that's what they need.

this decision tree helps with interaction by taking the user's current state and giving them a personalized suggestion without making them overthink it. it removes that "what should i do right now?" stress, which is the whole point of mindracer for people dealing with executive dysfunction and decision paralysis.

b. flowchart

see: fowler_decision_tree.png (in this folder)

the flowchart shows how the script checks energy level first, then time available, which leads to 9 different activity suggestions depending on what combo they picked.