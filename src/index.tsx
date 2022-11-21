import { App } from "./App";
import ReactDOM from "react-dom";
import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCDUhM_nRC9jOPCrMMolI0cL4lTV-OaOig",
  authDomain: "todo-list-d58d2.firebaseapp.com",
  databaseURL: "https://todo-list-d58d2-default-rtdb.firebaseio.com",
  projectId: "todo-list-d58d2",
  storageBucket: "todo-list-d58d2.appspot.com",
  messagingSenderId: "979268361383",
  appId: "1:979268361383:web:67aba41dc62d04dc0d0f82",
  measurementId: "G-N6QC90L89K",
};
/*
Инциализация Firebase
 */
export const app = initializeApp(firebaseConfig);
/*
Инициализация Firestore
 */
export const database = getFirestore(app);
/*
Рендерим компонент App
 */

export const storage = getStorage(app);
ReactDOM.render(<App />, document.getElementById("App"));
