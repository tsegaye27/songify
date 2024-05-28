# 🎵 Songify 🎵

**Songify** is a music playlist management application built with a modern web stack. The frontend is developed using React with TypeScript, React Router, Redux Toolkit, Redux-Saga, Emotion, and Styled-System. The backend is powered by Express, Mongoose, and MongoDB Atlas.

## Table of Contents

- [✨ Features](#-features)
- [💻 Technologies Used](#-technologies-used)
- [🚀 Installation](#-installation)
- [📖 Usage](#-usage)

## ✨ Features

- 🎼 Create, read, update, and delete playlists.
- 🎵 Add and remove songs from playlists.
- 🔍 Search functionality for songs within playlists.
- 🗃️ Persistent state management with Redux Toolkit.
- 🔄 Side effects and asynchronous actions handled with Redux-Saga.
- 💅 Responsive UI design with Emotion and Styled-System.
- 📡 Backend API for managing playlists and songs using Express and Mongoose.
- ☁️ Database hosted on MongoDB Atlas.

## 💻 Technologies Used

### Frontend

- **React** with **TypeScript**: For building user interfaces.
- **React Router**: For client-side routing.
- **Redux Toolkit**: For state management.
- **Redux-Saga**: For handling side effects.
- **Emotion**: For styling components with CSS-in-JS.
- **Styled-System**: For responsive design and theming.

### Backend

- **Express**: For building the REST API.
- **Mongoose**: For MongoDB object modeling.
- **MongoDB Atlas**: For cloud-hosted MongoDB database.

## 🚀 Installation

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- MongoDB Atlas account

### Clone the Repository

```sh
git clone https://github.com/tsegaye27/songify.git
cd songify
```

### Install Dependencies

#### Frontend

```sh
cd frontend
npm install
```

#### Backend

```sh
cd backend
npm install
```

### Setup Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
DB=your_mongodb_atlas_connection_string
PORT=8000
```

## 📖 Usage

### Running the Backend

```sh
cd backend
npm start
```

### Running the Frontend

```sh
cd frontend
npm start
```

Thank you for using Songify! If you have any questions or feedback, feel free to reach out. Happy coding! 🎶
