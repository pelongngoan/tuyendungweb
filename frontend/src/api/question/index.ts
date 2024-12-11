import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../db/firebaseConfig";

const userColRef = collection(db, "question");

const questionApi = {
  getQuestions: (callback: (messages: unknown[]) => void) => {
    const q = query(userColRef, orderBy("timestamp", "asc"));
    onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    });
  },

  addQuestion: async (message: {
    text: string;
    role?: "USER" | "ADMIN";
    senderId: string;
    senderFirstName?: string;
    senderLastName?: string;
    senderAvatar?: string;
    timestamp?: string;
    replyingToUser?: string;
    replyingToMessage?: string;
  }) => {
    try {
      await addDoc(userColRef, {
        ...message,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error adding question:", error);
      throw error;
    }
  },
};

export default questionApi;
