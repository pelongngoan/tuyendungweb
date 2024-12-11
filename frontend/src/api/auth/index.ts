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
      console.log("Sssss" + userId);

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
      console.log(data);
      console.log(userId);

      const userRef = doc(db, "user", userId);
      await updateDoc(userRef, data);
      return { userId, ...data };
    } catch (error) {
      console.error("Error updating user data:", error);
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

  // Other methods...
};

export default authApi;
