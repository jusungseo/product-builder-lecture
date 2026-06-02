# Project: Animal Face Test (동물상 테스트)

## Overview
A modern, playful web application that analyzes a user's face to determine if they look more like a dog or a cat. It uses a Teachable Machine model for image classification and features a sleek, responsive design.

## Features
- **Photo Upload**: Simple and intuitive drag-and-drop or file picker for selfies.
- **AI Analysis**: Real-time processing of the uploaded image using a pre-trained TensorFlow.js model.
- **Visual Results**: Dynamic display of results with percentage bars and descriptive traits for "Dog" and "Cat" types.
- **Modern UI**: High-end aesthetics with glassmorphism, OKLCH colors, and smooth animations.
- **Responsive Design**: Works perfectly on both mobile and desktop.

## Technical Details
- **Frontend**: Vanilla HTML5, CSS3 (Baseline features), and JavaScript (ES Modules).
- **AI Engine**: Google Teachable Machine (Image Model).
- **Libraries**: TensorFlow.js, Teachable Machine Image Library.
- **Styling**: Modern CSS (Container Queries, `:has()` selector, Logical Properties, OKLCH).

## Implementation Plan (Current)
1.  **Environment Setup**:
    *   Update `index.html` with new metadata and library scripts.
    *   Prepare `style.css` for new design language.
    *   Initialize `main.js` with ES Module structure.
2.  **UI Construction**:
    *   Build the Hero section and the Upload Zone.
    *   Create a hidden "Result" section to be revealed after analysis.
    *   Implement modern progress bars for classification scores.
3.  **Core Logic (main.js)**:
    *   Implement `ImageUploader` module to handle file reading and preview.
    *   Implement `ModelManager` to load the Teachable Machine model and run predictions.
    *   Implement `UIController` to manage transitions and result rendering.
4.  **Aesthetics & Polish**:
    *   Apply premium textures and shadows.
    *   Add micro-interactions for buttons and upload states.
    *   Ensure accessibility (ARIA labels, keyboard navigation).
5.  **Verification**:
    *   Test image classification accuracy.
    *   Verify responsive layout on various screen sizes.
    *   Check for any console errors or performance bottlenecks.
