import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../db/firebaseConfig";
import { InternshipPost } from "../types"; // Assuming you have a type for internship posts

const internshipPostsColRef = collection(db, "internships");

const internshipApi = {
  getInternshipsByMajor: async (major: string): Promise<InternshipPost[]> => {
    try {
      console.log("Fetching internships for major:", major);

      const q = query(
        internshipPostsColRef,
        where("mayjor", "array-contains", major)
      );
      const querySnapshot = await getDocs(q);

      // If there are documents, map them to internship posts
      const internshipPosts: InternshipPost[] = querySnapshot.docs.map(
        (doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            company: data.company || "",
            title: data.title || "",
            location: data.location || "",
            salary: data.salary || "",
            description: data.description || "",
            requirements: data.requirements || "",
            benefit: data.benefit || "",
            experience: data.experience || "",
            mayjor: data.mayjor || [],
            other: data.other || [],
            createdAt: data.createAt || "",
            imageUrl: data.imageUrl || "",
          };
        }
      );

      console.log("Fetched Internship Posts:", internshipPosts);

      return internshipPosts;
    } catch (error) {
      console.error("Error fetching internship posts by major:", error);
      throw error;
    }
  },

  // Get all internship posts
  getAllInternshipPosts: async (): Promise<InternshipPost[]> => {
    try {
      const querySnapshot = await getDocs(internshipPostsColRef);
      const internshipPosts: InternshipPost[] = querySnapshot.docs.map(
        (doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            company: data.company || "",
            title: data.title || "",
            location: data.location || "",
            salary: data.salary || "",
            description: data.description || "",
            requirements: data.requirements || "",
            benefit: data.benefit || "",
            experience: data.experience || "",
            mayjor: data.mayjor || [],
            other: data.other || [],
            createdAt: data.createAt || "",
            imageUrl: data.imageUrl || "",
          };
        }
      );
      return internshipPosts;
    } catch (error) {
      console.error("Error fetching all internship posts:", error);
      throw error;
    }
  },

  // Get a internship post by its ID
  getInternshipById: async (
    internshipId: string
  ): Promise<InternshipPost | null> => {
    try {
      console.log("first");

      const internshipDocRef = doc(db, "internships", internshipId);
      const internshipDocSnapshot = await getDoc(internshipDocRef);
      console.log(internshipDocSnapshot);

      if (internshipDocSnapshot.exists()) {
        return {
          id: internshipDocSnapshot.id,
          ...internshipDocSnapshot.data(),
        } as unknown as InternshipPost;
      } else {
        console.log("No such internship post found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching internship post by ID:", error);
      throw error;
    }
  },

  // Create a new internship post
  createInternshipPost: async (
    newInternshipPost: InternshipPost
  ): Promise<string> => {
    try {
      const docRef = await addDoc(internshipPostsColRef, newInternshipPost);
      console.log("Internship post created with ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error creating internship post:", error);
      throw error;
    }
  },

  // Delete a internship post by its ID
  deleteInternshipPost: async (internshipId: string): Promise<void> => {
    try {
      const internshipDocRef = doc(db, "internships", internshipId);
      await deleteDoc(internshipDocRef);
      console.log("Internship post deleted with ID:", internshipId);
    } catch (error) {
      console.error("Error deleting internship post:", error);
      throw error;
    }
  },

  // Update a internship post by its ID
  updateInternshipPost: async (
    internshipId: string,
    updatedInternshipPost: Partial<InternshipPost>
  ): Promise<void> => {
    try {
      const internshipDocRef = doc(db, "internships", internshipId);
      await updateDoc(internshipDocRef, updatedInternshipPost);
      console.log("Internship post updated with ID:", internshipId);
    } catch (error) {
      console.error("Error updating internship post:", error);
      throw error;
    }
  },
  checkInternshipStatus: async (
    userId: string,
    internshipId: string
  ): Promise<boolean> => {
    try {
      // Reference to the user document
      const userDocRef = doc(db, "user", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        // Check if the internshipId is in the appliedInternships array
        return (
          userData.appliedInternships &&
          userData.appliedInternships.includes(internshipId)
        );
      } else {
        console.log("No such user found!");
        return false;
      }
    } catch (error) {
      console.error("Error checking internship application status:", error);
      throw error;
    }
  },

  // Apply for an internship
  applyInternship: async (
    userId: string,
    internshipId: string
  ): Promise<void> => {
    try {
      // Check if the user has already applied for the internship
      const alreadyApplied = await internshipApi.checkInternshipStatus(
        userId,
        internshipId
      );
      if (alreadyApplied) {
        throw new Error("You have already applied for this internship.");
      }

      // Reference to the user document
      const userDocRef = doc(db, "user", userId);

      // Add the internshipId to the appliedInternships array
      await updateDoc(userDocRef, {
        appliedInternships: arrayUnion(internshipId), // Adds the internshipId if not already present
      });

      console.log(`User ${userId} applied for internship ${internshipId}`);
    } catch (error) {
      console.error("Error applying for internship:", error);
      throw error;
    }
  },

  // Withdraw an internship application (unapply the internship)
  unapplyInternship: async (
    userId: string,
    internshipId: string
  ): Promise<void> => {
    try {
      // Check if the user has applied for the internship
      const applicationStatus = await internshipApi.checkInternshipStatus(
        userId,
        internshipId
      );
      if (!applicationStatus) {
        throw new Error("You haven't applied for this internship.");
      }

      // Reference to the user document
      const userDocRef = doc(db, "users", userId);

      // Remove the internshipId from the appliedInternships array
      await updateDoc(userDocRef, {
        appliedInternships: arrayRemove(internshipId), // Removes the internshipId from the array
      });

      console.log(
        `User ${userId} withdrew their application for internship ${internshipId}`
      );
    } catch (error) {
      console.error("Error withdrawing internship application:", error);
      throw error;
    }
  },
};

export default internshipApi;
