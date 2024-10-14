// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
//import { fetchHistoryDate } from "./my-modules/fetchHistoryData";//
import { submitData } from "./my-modules/submit-data-js";
// import { submitData } from "./my-modules/submit-data-js";
// ... 既存のコード ...
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Cloud Firestoreの初期化
const db = getFirestore(app);

//Cloud FIfrestoreから取得したデータを表示する
const fetchHistoryDate = async () => {
    let tags = "";

    //rerottsコレクションのデータを取得
    const querySnapshot = await getDocs(collection(db, "reports"));

    // データをテーブリ表の形式に合わせてHTMLに挿入
    querySnapshot.forEach((doc) => {
        console.log('${doc.id} => ${doc.date()}');
        tags += '<tr><td>${doc.data().date}</td><td>${doc.data().comment}</td></tr>'
    });
    document.getElementById("js-history").innterHTML = tags;
  };

  //Cloud Firestoreから取得したデータを表示する
  if(document.getElementById("js-history")) {
      fetchHistoryDate(getDocs, collection, db);
    }

  // Cloud Firestoreにデータを送信する
  const submitDate = async (e) => {
    e.preventDefault();

    const formDate = new FormData(e.target);

    try {
      const docRef = await addDoc(collection(db, "reports"), {
        date: new Date(),
        name: formDate.get("name"),
        work: formDate.get("work"),
        Comment: formData.get("comment")
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
   }

   // Cloud Firestoreにデータを送信する
   if(document.getElementById("js-form")) {
      document.getElementById("js-form").addEventListener("submit", (e) =>  
        submitDate(e, addDoc, collection, db));
   };
    