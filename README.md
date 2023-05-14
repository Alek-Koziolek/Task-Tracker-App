# Task Tracker App

This project is my own variation of a todo list.

You can check it out here: [https://alek-koziolek.github.io/task-tracker-app/](https://alek-koziolek.github.io/task-tracker-app/).


## What does it do?

As the name suggests, the app allows users to keep track of their tasks. To use the app users first have to create an account and log in by using the login form.

When logged in users can add new tasks by filling in the form. They can add a title, description and due date for a task.

Then, they can perform operations on created tasks, such as marking the task as completed (or undoing a completed task), or deleting created tasks.

When the task's due date is approaching its end, the app will signal this by changing the appearance of the task.

## Technologies Used

The project is built in ReactJS. It uses react hooks like useState, useReducer, useContext, useEffect, and useCallback.

Fetch API communicates with Firebase, which is being used for storing data, via HTTP requests (REST API).

Styling is done with CSS modules.
