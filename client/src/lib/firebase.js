// Client-side Firebase configuration
// This file provides Firebase initialization for the frontend

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMOdvQW248_4ul-ciFEEmuOghb4xdS3gs",
  authDomain: "jpfinserv-892e1.firebaseapp.com",
  databaseURL: "https://jpfinserv-892e1-default-rtdb.firebaseio.com",
  projectId: "jpfinserv-892e1",
  storageBucket: "jpfinserv-892e1.firebasestorage.app",
  messagingSenderId: "166323272116",
  appId: "1:166323272116:web:f440b4c76307ea463c5ae1",
  measurementId: "G-GBS93JTW1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };