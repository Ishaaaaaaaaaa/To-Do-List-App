# To-Do-List-App
A simple and interactive ToDo List web application that allows users to add, edit, delete, and manage their daily tasks. It supports light/dark mode, drag-and-drop reordering, and automatically saves tasks using the browser's local storage.

## Features

* Add new tasks
* Delete tasks
* Edit tasks
* Mark task status: Active, Completed, Not Completed
* Toggle between Light Mode and Dark Mode (with hover preview)
* Drag and drop to reorder tasks
* Timestamp added when a task is created
* Local storage support for data persistence
* CSS transitions and hover effects for a smooth user experience

## What I Learned

* How to use `localStorage` to persist task data in the browser
* DOM manipulation using `innerHTML`, `createElement`, and event listeners
* Efficient task management using JavaScript array methods like `map()` and `filter()`
* CSS styling techniques such as transitions, hover effects, and theme toggling
* Theme switching using CSS class management (light/dark mode)
* Handling drag-and-drop interactions with `dragstart`, `dragover`, and `drop` events
* Maintaining and updating the order of tasks dynamically


## Challenges Faced

* Properly displaying and syncing tasks with `localStorage`
* Dynamically managing task status updates and edits
* Implementing smooth and error-free drag-and-drop reordering
* Ensuring theme toggling did not disrupt functionality or styling

## How I Solved Them

* Used `JSON.parse()` and `JSON.stringify()` to work with stored task data
* Leveraged `task.map()` to update specific task properties based on conditions
* Applied event delegation for scalable and cleaner event handling
* Implemented drag-and-drop using `dataTransfer` and `dataset` to reorder task arrays
* Managed global theme changes using CSS classes for clean toggling logic
