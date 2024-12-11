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
  and,
} from "firebase/firestore";
import { db } from "../../db/firebaseConfig";
import { JobPost } from "../types";

const jobPostsColRef = collection(db, "jobs");

const jobApi = {
  getJobsByMayjorOrMajor: async (
    major: string,
    cn: string
  ): Promise<JobPost[]> => {
    try {
      const q = query(
        jobPostsColRef,
        and(
          where("mayjor", "array-contains", major),
          where("major", "array-contains", cn)
        )
      );
      const querySnapshot = await getDocs(q);

      const jobPosts: JobPost[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id as string,
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
          imageUrl: data.imageUrl || "",
          createdAt: data.createdAt || "",
          expireDate: data.expireDate || "",
          major: data.major || [],
        };
      });

      console.log("Fetched jobs by mayjor or major:", jobPosts);
      return jobPosts;
    } catch (error) {
      console.error("Error fetching jobs by mayjor or major:", error);
      throw error;
    }
  },

  searchJobsByTitle: async (title: string) => {
    const q = query(
      jobPostsColRef,
      where("title", ">=", title),
      where("title", "<=", title + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
  getJobsByMajor: async (major: string): Promise<JobPost[]> => {
    try {
      const q = query(jobPostsColRef, where("mayjor", "array-contains", major));
      const querySnapshot = await getDocs(q);

      // If there are documents, map them to job posts
      const jobPosts: JobPost[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id as string,
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
          imageUrl: data.imageUrl || "",
          createdAt: data.createAt || "",
          expireDate: data.expireDate || "",
          major: data.major || [],
        };
      });

      console.log("Fetched Job Posts:", jobPosts);

      return jobPosts;
    } catch (error) {
      console.error("Error fetching job posts by major:", error);
      throw error;
    }
  },

  // Get all job posts
  getAllJobPosts: async (): Promise<JobPost[]> => {
    try {
      const querySnapshot = await getDocs(jobPostsColRef);
      const jobPosts: JobPost[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id as string,
          company: data.company || "", // Default value
          title: data.title || "",
          location: data.location || "",
          salary: data.salary || "",
          description: data.description || "",
          requirements: data.requirements || "",
          benefit: data.benefit || "",
          experience: data.experience || "",
          mayjor: data.mayjor || [],
          other: data.other || [],
          imageUrl: data.imageUrl || "",
          createdAt: data.createdAt || "",
          expireDate: data.expireDate || "",
          major: data.major || [],
        };
      });
      return jobPosts;
    } catch (error) {
      console.error("Error fetching all job posts:", error);
      throw error;
    }
  },

  // Get a job post by its ID
  getJobById: async (jobId: string): Promise<JobPost | null> => {
    try {
      const jobDocRef = doc(db, "jobs", jobId);
      const jobDocSnapshot = await getDoc(jobDocRef);
      console.log("sss");

      if (jobDocSnapshot.exists()) {
        const jobData = jobDocSnapshot.data();
        return jobData as JobPost;
      } else {
        console.log("No such job post found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching job post by ID:", error);
      throw error;
    }
  },

  // Create a new job post
  createJobPost: async (newJobPost: JobPost): Promise<string> => {
    try {
      const docRef = await addDoc(jobPostsColRef, newJobPost);
      return docRef.id;
    } catch (error) {
      console.error("Error creating job post:", error);
      throw error;
    }
  },

  // Delete a job post by its ID
  deleteJobPost: async (jobId: string): Promise<void> => {
    try {
      const jobDocRef = doc(db, "jobs", jobId);
      await deleteDoc(jobDocRef);
      console.log("Job post deleted with ID:", jobId);
    } catch (error) {
      console.error("Error deleting job post:", error);
      throw error;
    }
  },

  // Update a job post by its ID
  updateJobPost: async (
    jobId: string,
    updatedJobPost: Partial<JobPost>
  ): Promise<void> => {
    try {
      const jobDocRef = doc(db, "jobs", jobId);
      await updateDoc(jobDocRef, updatedJobPost);
      console.log("Job post updated with ID:", jobId);
    } catch (error) {
      console.error("Error updating job post:", error);
      throw error;
    }
  },
};

export default jobApi;
