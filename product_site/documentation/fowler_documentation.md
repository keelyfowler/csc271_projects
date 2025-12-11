# Final Project Developer Documentation
**Keely Fowler**  
**CSC 271 - Web Development**  
**December 2025**

---

## A. Overview

MindRacer is a mental health web application designed to help people struggling with decision paralysis and executive dysfunction. The core problem it addresses is that overwhelming "rotting" feeling when you're stuck and can't figure out what to do next - you know you should be doing things, but you're frozen and can't start any task.

The site has four main pages:

1. **Decision Tree Builder** (decision_tree.html) - The centerpiece of the site. Users answer two simple questions about their energy level (high/medium/low) and available time (lots/some/little), then get personalized activity suggestions that match their current state.

2. **Mood Log** (mood-log.html) - A tracking page where users can log how they're feeling and get mood-based suggestions for coping strategies.

3. **Blog** (blog.html) - Mental health resources, stories, and information about using the platform.

4. **Home/Landing Page** - Overview of the platform's purpose and features (currently the decision tree page serves as the home page).

The core message is providing structure for internal chaos the same way planners organize external tasks. Instead of staring at a blank todo list when you're overwhelmed, MindRacer guides you through structured pathways to help you make that first decision. What makes it different from other productivity apps is the focus on emotional state first - it acknowledges that you can't think logically when you're overwhelmed, which is exactly when you need help the most.

The site is built for people dealing with ADHD, anxiety, depression, or anyone who experiences executive dysfunction. The visual design uses calming earth tones (sage greens, muted reds/pinks, and peachy accents) to create a soothing, approachable experience. The interface is intentionally simple to avoid overwhelming users who are already feeling stuck.

---

## B. Coding Approach & Technical Decisions

### File Organization

I organized the project into a clear folder structure:
```
product_site/
├── decision_tree.html
├── mood-log.html
├── blog.html
├── css/
│   └── main.css
├── js/
│   └── decisiontree.js
├── images/
│   └── [logo and mascot images]
└── documentation/
    └── [project docs]
```

This separation keeps things clean - all styles in one CSS file, all interactivity in one JavaScript file, and all images in their own folder. It makes the code easy to maintain and update.

### CSS Approach: Variables & Grid Layout

Initially, my CSS was a mess with repeated color codes and inconsistent spacing everywhere. I completely redid it using CSS variables, which I found through W3Schools research. Now all my colors and fonts are stored in the `:root` selector:

```css
:root {
    --main-bg-color: rgb(62, 69, 49);
    --color-nav-bg: #c5cca7;
    --color-heading: #914040;
    --color-btn-bg: #c38282;
    --font-heading: "Trebuchet MS", Verdana, Arial, sans-serif;
    --font-body: Verdana, Geneva, sans-serif;
}
```

This means if I want to change the color scheme, I only update it in one place instead of hunting through 500+ lines of CSS. It's also way easier to maintain design consistency across pages.

For layout, I switched from flexbox to CSS Grid for the navbar and card layouts. Grid gives me more precise control over spacing and alignment. The navbar uses a 5-column grid (logo + 4 nav links), and I used `clamp()` for fluid typography so text scales smoothly across screen sizes without looking too big or too small.

### JavaScript Modularization

My JavaScript went through several iterations as I learned more about functions and modularization. Originally, I had a lot of repeated code - the same logic for updating colors appeared in multiple places, reset functionality was 20+ lines of inline code, etc.

I refactored everything into reusable functions:

**`resetForm()`** - Resets the entire form, hides result sections, clears dropdowns. This extracted all the inline reset logic into one place.

**`updateUIColors(energy, element)`** - Updates background colors based on energy level. Takes the energy string and the DOM element to update as parameters. Makes the color-changing logic reusable across different elements.

**`filterActivities(energy, time, excludeActivity)`** - Filters the activities array based on user inputs. This logic was repeated in both `getSuggestion()` and `showMoreSuggestions()`, so pulling it into its own function eliminated duplication.

**`validateSelections()`** - Checks if both dropdowns have valid selections. Returns true/false. Makes validation logic reusable.

### Object-Oriented Design

I used constructor notation to create Activity objects:

```javascript
function Activity(name, energy, time, category) {
    this.name = name;
    this.energy = energy;
    this.time = time;
    this.category = category;
}

Activity.prototype.display = function() {
    return `${this.name} (${this.category})`;
};

Activity.prototype.matches = function(userEnergy, userTime) {
    return this.energy === userEnergy && this.time === userTime;
};
```

This organizes all my activity data with a consistent structure. Each activity knows its own properties and has methods to display itself and check if it matches user criteria. I created 20+ activity instances covering different energy/time combinations across categories like physical, mental, creative, rest, productive, and social.

### Responsive Design Strategy

I used a mobile-first approach with media queries. The default styles work for desktop, then I have a `@media screen and (max-width: 700px)` breakpoint that:
- Collapses 2-column grids into single columns
- Adjusts navbar from 5 columns to 3 columns
- Reduces font sizes appropriately
- Increases button tap targets for mobile
- Ensures images never overflow

I tested responsiveness constantly using Chrome DevTools device emulation.

---

## C. Course Concepts Integration

### Design & Planning (SDLC)

I followed an Agile SDLC approach with iterative development. Started with planning documents (site map, wireframes, target audience profiles), then built the site in sprints. Each assignment built on the previous one - HTML structure, then CSS styling, then JavaScript interactivity, then refinement based on peer feedback.

My site map shows the full structure with all planned pages and their relationships. The wireframes defined layouts before I wrote any code, which saved time because I knew exactly what I was building.

### HTML (Semantic Structure & Content)

I used semantic HTML5 elements throughout:
- `<nav>` for navigation bars
- `<section>` for major content areas
- `<article>` for blog posts
- `<form>` with proper `<label>` associations
- Proper heading hierarchy (h1 → h2 → h3)

Every image has descriptive alt text for screen readers. Forms include validation attributes and labels with `for` attributes connecting to input IDs. The document structure follows standards with proper DOCTYPE, meta tags for charset and viewport, and descriptive title tags for each page.

SEO was integrated through:
- Descriptive page titles
- Meta keywords tags
- Semantic headings that describe content
- Meaningful link text (not "click here")
- Image alt text that describes images

I also added Google Analytics tracking code to monitor site usage.

### CSS (Visual Hierarchy & Layout)

CSS variables create a consistent color palette across all pages. I used the cascade strategically - base styles in element selectors, reusable patterns in class selectors, page-specific styles in ID selectors.

The visual hierarchy uses:
- Size contrast (large headings vs. body text)
- Color contrast (dark text on light backgrounds)
- Spacing (generous padding/margins)
- Typography (different fonts for headings vs. body)

Layout systems include:
- Grid for navbar (5-column layout)
- Grid for card layouts (2-column that collapses to 1-column on mobile)
- Flexbox for button groups
- Responsive images that scale with container width

Float left/right is used for images, hover effects on links and buttons provide interactivity feedback, and the active class shows which page the user is on.

### JavaScript (Dynamic Updates & Interactivity)

The decision tree uses:
- **Variables** to store user selections and activity data
- **DOM selection** (`getElementById`, `querySelector`)
- **DOM manipulation** (changing `innerHTML`, `textContent`, `style.backgroundColor`)
- **Conditionals** to check energy/time combinations and route to appropriate suggestions
- **Loops** to iterate through activities array and filter matches
- **Functions** with parameters and return values for reusable logic
- **Constructor notation** to create Activity objects
- **Event listeners** on buttons and form elements

Form validation includes:
- **Focus events** - Show helpful hints when users click into dropdowns
- **Blur events** - Validate selections when users leave dropdowns
- **Submit events** - Prevent default form submission, validate all inputs, show success/error messages

The NodeList iteration happens when I use `querySelectorAll` to select multiple elements and loop through them to add event listeners or update content.

### Accessibility & Usability

Accessibility features include:
- Alt text on all images
- High color contrast between text and backgrounds (though peer feedback showed I need to improve the navbar contrast)
- Keyboard navigation support (all interactive elements are keyboard accessible)
- Semantic HTML for screen reader compatibility
- No time-sensitive interactions
- Large tap targets on mobile

I tested with:
- WAVE tool for accessibility errors
- Lighthouse for accessibility scores
- Manual keyboard testing
- Chrome DevTools for responsive design testing

Usability principles applied:
- Clear, consistent navigation on every page
- Predictable button behavior
- Helpful form feedback
- Simple, plain language (no jargon)
- Visual feedback for hover and active states

---

## D. Challenges & Problem-Solving

### Challenge 1: CSS Layout Consistency

**The Problem:** Early in development, my CSS was extremely inconsistent. I had hardcoded color values scattered everywhere, different spacing on different pages, and the layout would break on smaller screens. The navbar looked different on each page because I was using different IDs and classes inconsistently.

**What I Tried:**
- First attempt: Just kept adding more CSS rules to fix individual issues. This made the file balloon to 600+ lines of spaghetti code.
- Second attempt: Tried to use flexbox for everything, but couldn't get the precise control I wanted for the navbar layout.

**How I Solved It:**
Complete CSS rewrite using:
1. CSS variables for all colors, fonts, and spacing values
2. CSS Grid for navbar and card layouts (more control than flexbox)
3. Consistent class and ID naming across all pages
4. `clamp()` for fluid typography
5. Clear organization with commented sections

Fixed the navbar inconsistency by:
- Changing all pages to use the same `id="nav-bar"` 
- Adding `class="logo"` to logo images for consistent sizing
- Using the same grid structure on all pages
- Setting correct `class="active"` per page

**What I Learned:**
Planning CSS architecture upfront saves hours of fixing later. CSS variables are game-changers for maintainability. Sometimes starting over is faster than trying to fix a mess.

### Challenge 2: JavaScript Decision Tree Logic

**The Problem:** Getting the decision tree to suggest the right activities based on user inputs was harder than expected. Initially, I had a giant if-else chain with 9 different conditions that was impossible to debug. I also struggled with filtering activities when users clicked "show more suggestions" - it would sometimes show the same suggestion twice.

**What I Tried:**
- First version: Massive nested if-else statements. Worked but was unreadable and hard to maintain.
- Second version: Tried using a switch statement, but it was still repetitive.

**How I Solved It:**
1. Created an Activity object constructor with a `matches()` method
2. Stored all activities in an array
3. Used `filter()` to find matching activities based on energy and time
4. Created a `filterActivities()` function that excludes already-shown suggestions
5. Used `Math.random()` to pick from matching activities

This approach is way more scalable - adding new activities is just creating new object instances instead of adding more if-else conditions.

**What I Learned:**
Object-oriented programming makes complex data way easier to manage. Array methods like `filter()` are powerful. Breaking logic into small, testable functions makes debugging easier.

### Challenge 3: Mobile Responsiveness

**The Problem:** Peer reviewers pointed out that form buttons were tiny on mobile (hard to tap), images overflowed containers, and text didn't resize properly across different screen sizes.

**What I Tried:**
- Fixed button sizes in the mobile media query
- Used `max-width: 100%` and `height: auto` on images
- Added `clamp()` for font sizes

**How I Solved It:**
- Mobile media query at 700px breakpoint
- Increased button padding and font-size for mobile
- Made radio buttons bigger (easier to tap)
- Collapsed 2-column grids to 1-column on mobile
- Used fluid typography with `clamp()` so text scales smoothly
- Tested on actual devices (iPad, iPhone) per peer feedback

**What I Learned:**
Always test on real devices, not just Chrome DevTools. Mobile users need bigger tap targets. Fluid typography with `clamp()` is way better than fixed breakpoints.

### Challenge 4: cPanel Deployment (Ongoing)

**The Problem:** Getting the final version deployed to cPanel has been frustrating. Old CSS keeps showing up even after fresh deployments, there's a case-sensitivity issue with the Labs folder (lowercase locally, uppercase on GitHub/cPanel), and cache issues make it hard to tell if changes actually deployed.

**What I Tried:**
- Hard refreshing browsers
- Clearing cache
- Deleting and re-cloning the repository
- Renaming folders to fix case sensitivity

**Current Status:**
Still troubleshooting with TA assistance. The code works perfectly locally, but deployment has technical issues beyond my control. This is a reminder that real-world development involves infrastructure problems, not just code problems.

**What I'm Learning:**
Version control gets complicated with case-sensitive file systems. Browser caching is a pain. Production deployment is different from local development. Sometimes you need help from people who know the infrastructure.

---

## E. Strengths & Areas For Improvement

### What I'm Most Proud Of

**The decision tree logic and Activity objects.** This is the heart of MindRacer, and getting it to work smoothly took a lot of iteration. The way activities filter based on user input, exclude already-shown suggestions, and display with appropriate categories - it all works together really well. The object-oriented approach makes it easy to add new activities or modify existing ones.

I'm also proud of how the site looks. The color scheme is calming, the mascot illustrations are friendly and approachable, and the overall vibe matches the mental health focus. Peer feedback confirmed people really liked the visual design.

### What Needs More Work

**Accessibility, specifically color contrast.** Multiple peer reviewers flagged that the navbar has contrast issues - the pink/red text on green background is hard to read. I need to darken the link colors to meet WCAG standards. I also need to review all alt text to make sure it's descriptive enough for screen readers.

**Performance optimization.** Lighthouse scores showed poor performance (55 mobile, 31-43 desktop) mainly due to image load times. I need to resize images before uploading them to reduce file sizes. Font loading is also slow - I could optimize by using system fonts as fallbacks or preloading custom fonts.

**Mobile form elements.** While I improved button sizes after peer feedback, the form dropdowns could still be styled better on mobile. They look a bit generic compared to the rest of the design.

**The home page doesn't exist yet.** Right now, the decision tree page serves as both the home page and the decision builder, which confused peer reviewers. I need to create a proper landing page that explains the platform before users dive into the decision tree.

### If I Had More Time

**1. Create proper mood tracking functionality.** Right now mood-log.html is mostly a placeholder. I'd add:
- Form to log daily moods with timestamps
- Local storage or database to save mood history
- Charts/graphs to visualize mood patterns over time
- Mood-based suggestions that learn from user patterns

**2. Make the decision tree customizable.** The original vision was users could add their own moods, activities, and decision branches. I'd implement:
- "Edit Tree" mode with add/delete buttons
- Save custom trees to local storage
- Import/export functionality to share trees
- Visual tree editor with drag-and-drop

**3. Expand activity categories and suggestions.** Currently there are 20+ activities across 6 categories. I'd add:
- 50+ more activities covering more situations
- Subcategories for better organization
- Links to external resources (YouTube videos, Spotify playlists, guided meditations)
- Community-submitted activities

**4. Improve performance.** Beyond just image optimization:
- Lazy loading for images
- Minify CSS and JavaScript
- Use a CDN for external resources
- Implement service workers for offline functionality

**5. Add user accounts and syncing.** Right now everything is session-based. With accounts:
- Save preferences and custom trees
- Track progress over time
- Sync across devices
- Social features (share trees, community activities)

---

## Conclusion

Building MindRacer taught me that web development is iterative - you start with an idea, build a rough version, get feedback, and improve. The final product is way better than my first attempts because I learned from mistakes, incorporated peer feedback, and kept refining the code.

The biggest lesson is that good planning saves time later. Having wireframes, a site map, and clear specifications before coding meant I knew what I was building. When I did run into problems (like the CSS mess or complex JavaScript logic), breaking them into smaller pieces and solving step-by-step worked way better than trying to fix everything at once.

This project also taught me the importance of accessibility and responsive design - features that work great on my laptop might be unusable on mobile if I don't test properly. Real users have different devices, different abilities, and different needs.

I'm proud of what I built. MindRacer addresses a real problem I deal with personally, and I hope it can help others who struggle with decision paralysis and executive dysfunction. There's still work to do (better accessibility, performance optimization, deployment issues), but the foundation is solid and the core functionality works well.