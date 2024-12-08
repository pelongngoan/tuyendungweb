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
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as unknown as InternshipPost)
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
};

export default internshipApi;
