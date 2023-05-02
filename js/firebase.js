import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js';
import { getFirestore, collection, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore-lite.js';

const firebaseConfig = {
  apiKey: "AIzaSyBJbWW8b12uV3qYlQgMuwPzkT6ogLtOZwY",
  authDomain: "diplombglk.firebaseapp.com",
  projectId: "diplombglk",
  storageBucket: "diplombglk.appspot.com",
  messagingSenderId: "945422048078",
  appId: "1:945422048078:web:09d06ec29a4aa95c349c1f",
  measurementId: "G-CPLJ55V73D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export let loadedFlags = [];
export const links = [];

export async function getUsers() {
  const usersCol = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map(doc => {
    let obj = doc.data();
    obj.id = doc.id;
    return obj
  });
  return usersList;
}

export async function getItems() {
  const itemsCol = collection(db, 'items');
  const itemsSnapshot = await getDocs(itemsCol);
  const itemsList = itemsSnapshot.docs.map(doc => {
    let obj = doc.data()
    obj.id = doc.id;
    return obj
  });
  return itemsList;
}

export async function setUser(data) {
  await addDoc(collection(db, "users"), data);
}

export function setPicture(file, path) {
  const storageRef = ref(storage, `${path}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  loadedFlags.push(path)
  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        loadedFlags.shift(path)
        links.push(downloadURL)
        console.log('File available at', downloadURL);
      });
    }
  )

}

export async function setItem(data) {
  const docRef = await addDoc(collection(db, "items"), data);
  return docRef;
}

export async function changeItemByID(ID, data) {
  const itemRef = doc(db, "items", `${ID}`);
  await updateDoc(itemRef, data);
}

export async function getItemByID(ID) {
  const itemRef = doc(db, "items", `${ID}`);
  const itemSnap = await getDoc(itemRef);
  return itemSnap.data()
}

export async function getUserByID(ID) {
  const userRef = doc(db, "users", `${ID}`);
  const userSnap = await getDoc(userRef);
  return userSnap.data()
}

export async function updateItemByID(links, ID) {
  const itemRef = doc(db, "items", `${ID}`);
  await updateDoc(itemRef, {
    photos: links
  });
}

export async function deleteItemById(ID) {
  await deleteDoc(doc(db, "items", `${ID}`));
}

export async function setFavoritesByID(favArr, ID) {
  const userRef = doc(db, "users", `${ID}`);
  await updateDoc(userRef, {
    favorites: favArr
  });
}