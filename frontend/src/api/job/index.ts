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
import { JobPost } from "../types"; // Assuming you have a type for job posts

const jobPostsColRef = collection(db, "jobs");

const jobApi = {
  getJobsByMajor: async (major: string): Promise<JobPost[]> => {
    try {
      console.log("Fetching jobs for major:", major);

      const q = query(jobPostsColRef, where("mayjor", "array-contains", major));
      const querySnapshot = await getDocs(q);

      // If there are documents, map them to job posts
      const jobPosts: JobPost[] = querySnapshot.docs.map((doc) => {
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
      const jobPosts: JobPost[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // Add the job post data
      }));
      return jobPosts;
    } catch (error) {
      console.error("Error fetching all job posts:", error);
      throw error;
    }
  },

  // Get a job post by its ID
  getJobById: async (jobId: string): Promise<JobPost | null> => {
    try {
      console.log("first");

      const jobDocRef = doc(db, "jobs", jobId);
      const jobDocSnapshot = await getDoc(jobDocRef);
      console.log(jobDocSnapshot);

      if (jobDocSnapshot.exists()) {
        return { id: jobDocSnapshot.id, ...jobDocSnapshot.data() } as JobPost;
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
      console.log("Job post created with ID:", docRef.id);
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
