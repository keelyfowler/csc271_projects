assignment 12: objects
keely fowler - 11/21/25

a. describe your objects

my object represents an activity suggestion for the mindracer site. each activity needs to store information about what the activity is, what energy level it's good for, how much time it takes, and what category it falls into (physical, mental, rest, etc).

data to store (properties):
- activity name (string) - the actual suggestion text
- energy level required (string) - high/medium/low
- time required (string) - lots/some/little
- category (string) - physical, mental, creative, rest, productive, or social

tasks it can perform (methods):
- display() - returns formatted activity string with category
- matches(energy, time) - checks if activity fits user's energy and time inputs

this organizes all my activity data using a constructor so i can create multiple activity objects with the same structure. users can browse activities by category in the "browse activities by category" section, which uses the object properties and methods to filter and display results