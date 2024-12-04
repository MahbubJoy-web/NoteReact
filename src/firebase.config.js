import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDqxGpX5ItVXkR8JxCBBwwfnPUanWO3noI",
  authDomain: "notereact-1330d.firebaseapp.com",
  projectId: "notereact-1330d",
  storageBucket: "notereact-1330d.firebasestorage.app",
  messagingSenderId: "634859661738",
  appId: "1:634859661738:web:f275d8704469116bb223d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app