import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../db/firebaseConfig";
import { LoginParams, RegisterParams } from "../types";
import { UserDataType } from "../../context/types";

const userColRef = collection(db, "user");

const authApi = {
  // Register user and add to Firestore
  register: async (data?: RegisterParams) => {
    try {
      if (!data) {
        return;
      }
      // Check if the email already exists
      const q = query(userColRef, where("email", "==", data.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Email already exists
        throw new Error("Email này đã tồn tại");
      }

      // Add the new user to Firestore
      const newUser = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        createdAt: new Date().toISOString(),
      };

      // Add the new user document to the Firestore collection
      const docRef = await addDoc(userColRef, newUser);

      // Return success message with the user ID
      return {
        email: data.email,
        message: "User registered successfully",
        userId: docRef.id,
      };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  // Login user using Firebase
  login: async (data: LoginParams) => {
    try {
      // Create a query to check if the email exists
      const q = query(userColRef, where("email", "==", data.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User exists, now check the password
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        if (userData.password === data.password) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...userWithoutPassword } = userData;
          return {
            user: {
              ...userWithoutPassword,
              id: userDoc.id,
            } as UserDataType,
          };
        } else {
          throw new Error("Incorrect password");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Get user by ID (Firestore ID)
  getUserByID: async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "user", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = userData; // Exclude password
        return userWithoutPassword;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const querySnapshot = await getDocs(userColRef);
      const users = querySnapshot.docs.map((doc) => {
        const userData = doc.data();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = userData; // Exclude password
        return userWithoutPassword;
      });
      return users;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  },

  // Update user data by ID
  updateUser: async (
    userId: string | undefined,
    data: Partial<RegisterParams>
  ) => {
    try {
      if (!userId) {
        return;
      }

      // Update user in "user" collection
      const userRef = doc(db, "user", userId);
      await updateDoc(userRef, data);

      // Update related questions in "question" collection
      if (data.imageUrl) {
        const questionQuery = query(
          collection(db, "question"),
          where("senderId", "==", userId)
        );

        const questionDocs = await getDocs(questionQuery);

        const batch = writeBatch(db);
        questionDocs.forEach((doc) => {
          batch.update(doc.ref, { senderAvatar: data.imageUrl });
        });

        await batch.commit();
      }

      return { userId, ...data };
    } catch (error) {
      console.error("Error updating user or related questions:", error);
      throw error;
    }
  },

  // Delete user by ID
  deleteUser: async (userId: string) => {
    try {
      const userRef = doc(db, "user", userId);
      await deleteDoc(userRef);
      return { userId, message: "User deleted successfully" };
    } catch (error) {
      console.error("Error deleting user data:", error);
      throw error;
    }
  },

  updateUserAppliedJobs: async (userId: string | undefined, jobId: string) => {
    try {
      if (!userId) {
        return;
      }

      // Fetch the current user's document
      const userRef = doc(db, "user", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const appliedJobs = userData?.appliedJobs || [];

        // If the job is not already applied, add it to the array
        if (!appliedJobs.includes(jobId)) {
          appliedJobs.push(jobId);
        }

        // Update the user document with the new applied job
        await updateDoc(userRef, {
          appliedJobs: appliedJobs,
        });

        return { userId, appliedJobs };
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      throw error;
    }
  },
  // Get all applied jobs for a user
  getAppliedJobs: async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "user", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const appliedJobs = userData?.appliedJobs || [];
        return appliedJobs;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      throw error;
    }
  },
  updateUserAppliedInterns: async (
    userId: string | undefined,
    internId: string
  ) => {
    try {
      if (!userId) {
        return;
      }

      // Fetch the current user's document
      const userRef = doc(db, "user", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const appliedInterns = userData?.appliedInterns || [];

        // If the intern is not already applied, add it to the array
        if (!appliedInterns.includes(internId)) {
          appliedInterns.push(internId);
        }

        // Update the user document with the new applied intern
        await updateDoc(userRef, {
          appliedInterns: appliedInterns,
        });

        return { userId, appliedInterns };
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error applying for intern:", error);
      throw error;
    }
  },
  // Get all applied interns for a user
  getAppliedInterns: async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "user", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const appliedInterns = userData?.appliedInterns || [];
        return appliedInterns;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error fetching applied interns:", error);
      throw error;
    }
  },
};

export default authApi;
