import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ProgressBar({ file, setFile }) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    const collectionRef = collection(db, "images");
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        let percentile = (snap.bytesTransferred / snap.totalBytes) * 100;

        if (!cancel) {
          setProgress(percentile);
        }
      },
      (err) => {
        if (!cancel) {
          setError(err);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (!cancel) {
            setUrl(downloadURL);
            if (url != null) {
              addDoc(collectionRef, { url: url, date: serverTimestamp() });
            }
          }
        });
      }
    );

    if (url) {
      if (!cancel) {
        setFile(null);
      }
    }

    return () => setCancel(true);
  }, [url, setFile]);

  return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
}
