# CodeLens: Interactive Code Visualization and Learning Platform

![CodeLens Banner](https://img.shields.io/badge/CodeLens-Interactive_Learning-blue?style=for-the-badge&logo=codeigniter)

**CodeLens** is a comprehensive, interactive code visualization and execution platform designed to make learning programming and data structures intuitive and engaging. It provides visual insights into code execution, memory management, and data structure manipulation across multiple programming languages.

## 🚀 Features

### Core Capabilities
*   **Multi-Language Support**: Execute and visualize code in C, C++, Java, Python, and JavaScript.
*   **Memory Visualization Engine**: See step-by-step memory allocation, stack frames, and variable states during execution.
*   **Data Structures (D.S.) Engine**: Interactive visualizations for stacks, queues, linked lists, trees, and more.
*   **Live Code Editor**: Built-in syntax highlighting, autocomplete, and a fullscreen mode for distraction-free coding.

### User & Platform Features
*   **User Profiles & Dashboards**: Track learning history, manage custom avatars, and monitor progress.
*   **Notes & Examples**: Access a curated bank of examples to study and learn from. Take notes alongside code execution.
*   **Admin Panel**: Comprehensive dashboard to manage users, view analytics, and handle reports and orders.
*   **Custom Themes**: Support for light and dark modes to suit user preferences.

## 🏗️ Project Structure

The project is divided into a robust Backend and an interactive Frontend.

```text
CodeLens/
├── Backend/                   # Node.js & Express API
│   ├── config/                # Database configurations (MongoDB)
│   ├── Data/                  # Static assets like Avatars and JSON examples
│   ├── middleware/            # Auth and Admin protection
│   ├── models/                # Mongoose schemas (User, Order, Analytics, etc.)
│   ├── routes/                # API endpoints (auth, execute, examples, admin)
│   └── scripts/               # Utility scripts (e.g., compiler checks)
│
├                              # HTML, CSS, Vanilla JS
├   ├── index.html
├   ├── admin.html
├   ├── notes.html
├   ├── editor.html
│   ├── css/                   # Stylesheets for themes, editor, dashboards
│   ├── js/                    # Core logic, auth, API integration, UI controllers
│   └── Visualization Engine/  # The core engines for rendering code & memory states
│       ├── D.S Engine/        # Data structure renders
│       └── Memory Engine/     # Stack/Heap visualization
└── 
```

## 🛠️ Tech Stack

**Frontend:**
*   HTML5 / CSS3 / JavaScript (ES6+)
*   Custom Visualization Engines (DOM/Canvas based)
*   Code Editor Library (e.g., CodeMirror/Monaco integration)

**Backend:**
*   Node.js & Express.js
*   MongoDB & Mongoose (Database)
*   JWT (Authentication)
*   Child Processes for safe code execution

## ⚙️ Setup and Installation

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16+)
*   [MongoDB](https://www.mongodb.com/) (Local or Atlas)
*   Compilers installed locally for execution (e.g., GCC for C/C++, JDK for Java, Python 3)

### Installation Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/CodeLens.git
    cd CodeLens
    ```

2.  **Setup the Backend**
    ```bash
    cd Backend
    npm install
    # Create a .env file and add your MongoDB connection string and JWT Secret
    # MONGO_URI=your_mongodb_uri
    # JWT_SECRET=your_jwt_secret
    npm start
    ```

3. **Run the Frontend**
    Since the frontend is built with pure HTML/JS, you can serve it using any local web server (e.g., Live Server extension in VS Code).
    *Open `index.html` in your browser.*

## 📄 License

This project is created for educational purposes.
