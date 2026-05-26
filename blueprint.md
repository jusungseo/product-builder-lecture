# Project: Lotto Number Generator with Landing Page

## Overview
A modern, visually appealing web application that generates random lotto numbers. It features a stylish landing page that welcomes users before they enter the generator experience.

## Features
- **Landing Page**: A beautiful entry screen with a 'Enter' button.
- **Lotto Generator**: A clean interface to generate 6 random numbers (1-45).
- **Web Components**: Custom `<lotto-ball>` elements for consistent and encapsulated styling.
- **Modern CSS**: Using gradients, transitions, and flexible layouts.

## Implementation Details
- **HTML5**: Semantic structure for sections.
- **CSS3**: Modern styling with animations for the transition.
- **JavaScript (ES6)**: State management for switching between landing and generator views.

## Current Plan: Add Landing Page
1.  **Modify `index.html`**:
    *   Add a `<section id="landing-screen">` with a title and 'Enter' button.
    *   Wrap the existing generator content in a `<section id="generator-screen" class="hidden">`.
2.  **Modify `style.css`**:
    *   Add styles for the landing screen (background gradients, typography, animated button).
    *   Implement `.hidden` class to toggle visibility.
    *   Enhance the generator screen aesthetics.
3.  **Modify `main.js`**:
    *   Add event listener for the 'Enter' button to switch screens with a smooth transition.
