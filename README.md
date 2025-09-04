# An Express Server Template

# Q&A Web Application

A simple **Question & Answer web application** where users can create, view, update, and delete questions, as well as add and manage answers. Built with **Node.js**, **Express**, and **PostgreSQL**.  

---

## Project Description

This application allows users to manage questions and answers in an organized way. Users can create questions with a title, description, and category, and others can provide answers for each question.  

**Key highlights:**
- **Technologies Used:** Node.js, Express.js, PostgreSQL  
- **Why these technologies:**  
  - **Node.js**: Handles server-side logic efficiently.  
  - **Express**: Provides simple routing and middleware support.  
  - **PostgreSQL**: Stores structured data and allows easy relationships between questions and answers.  
- **Challenges faced:**  
  - Ensuring that deleting a question also deletes all its associated answers.  
  - Validating input data for questions and answers before saving to the database.  
- **Future improvements:**  
  - Add user authentication and authorization.  
  - Implement pagination and search filters.  
  - Add a frontend interface for better user interaction.  

---
## Features

### Question Management
- Users can **create questions** with title, description, and category (e.g., Software, Food, Travel, Science, etc.)  
- Users can **view all questions**  
- Users can **view a single question** by ID  
- Users can **edit a question**  
- Users can **delete a question** (all related answers are also deleted)  
- Users can **search questions** by title or category  

### Answer Management
- Users can **create answers** for a specific question (max 300 characters)  
- Users can **view all answers** for a question  
- Users can **delete answers**  

---
