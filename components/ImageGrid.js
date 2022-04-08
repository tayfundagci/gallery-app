import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ImageGrid({ setSelectedImage }) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let ref = collection(db, "images");
    ref = query(ref, orderBy("date", "desc"));

    onSnapshot(ref, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });
  }, []);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            onClick={() => setSelectedImage(doc.url)}
            layout
            whileHover={{ opacity: 1 }}
          >
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              src={doc.url}
              alt="uploaded image"
            />
          </motion.div>
        ))}
    </div>
  );
}
