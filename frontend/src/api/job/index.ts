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
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../db/firebaseConfig";
import { JobPost } from "../types";

const jobPostsColRef = collection(db, "jobs");
interface JobPost2 extends JobPost {
  id: string;
}
const jobApi = {
  getJobsByMayjorAndMajor: async (
    major: string,
    cn: string
  ): Promise<JobPost[]> => {
    try {
      // Convert `major` and `cn` to Sentence case
      const toSentenceCase = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

      const formattedMajor = toSentenceCase(major);
      const formattedCn = toSentenceCase(cn);
      // Query for `mayjor` containing `formattedMajor`
      const query1 = query(
        jobPostsColRef,
        where("mayjor", "array-contains", formattedMajor)
      );
      const querySnapshot1 = await getDocs(query1);

      // Query for `major` containing `formattedCn`
      const query2 = query(
        jobPostsColRef,
        where("major", "array-contains", formattedCn)
      );
      const querySnapshot2 = await getDocs(query2);

      // Convert both query results into JobPost arrays
      const jobsByMayjor = querySnapshot1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as JobPost2[];

      const jobsByMajor = querySnapshot2.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as JobPost2[];

      // Find intersection of both results based on `id`
      const filteredJobs = jobsByMayjor.filter((job) =>
        jobsByMajor.some((j) => j.id === job.id)
      );

      console.log(
        "Fetched jobs with mayjor and major conditions:",
        filteredJobs
      );
      return filteredJobs;
    } catch (error) {
      console.error(
        "Error fetching jobs with mayjor and major conditions:",
        error
      );
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
      id: doc.id as string,
      company: doc.data().company || "",
      title: doc.data().title || "",
      location: doc.data().location || "",
      salary: doc.data().salary || "",
      description: doc.data().description || "",
      requirements: doc.data().requirements || "",
      benefit: doc.data().benefit || "",
      experience: doc.data().experience || "",
      mayjor: doc.data().mayjor || [],
      other: doc.data().other || [],
      imageUrl: doc.data().imageUrl || "",
      createdAt: doc.data().createdAt || "",
      expireDate: doc.data().expireDate || "",
      major: doc.data().major || [],
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
  checkApplicationStatus: async (
    userId: string,
    jobId: string
  ): Promise<boolean> => {
    try {
      // Reference to the user document
      const userDocRef = doc(db, "user", userId);
      const userDocSnapshot = await getDoc(userDocRef);
      console.log(userId);
      console.log(jobId);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        // Check if the jobId is in the appliedJobs array
        return userData.appliedJobs && userData.appliedJobs.includes(jobId);
      } else {
        console.log("No such user found!");
        return false;
      }
    } catch (error) {
      console.error("Error checking application status:", error);
      throw error;
    }
  },
  applyJob: async (userId: string, jobId: string): Promise<void> => {
    try {
      // Check if the user has already applied for the job
      const alreadyApplied = await jobApi.checkApplicationStatus(userId, jobId);
      if (alreadyApplied) {
        throw new Error("You have already applied for this job.");
      }

      // Reference to the user document
      const userDocRef = doc(db, "user", userId);

      // Add the jobId to the appliedJobs array
      await updateDoc(userDocRef, {
        appliedJobs: arrayUnion(jobId), // Adds the jobId if not already present
      });

      console.log(`User ${userId} applied for job ${jobId}`);
    } catch (error) {
      console.error("Error applying for job:", error);
      throw error;
    }
  },

  // Withdraw an application (unapply the job)
  unapplyJob: async (userId: string, jobId: string): Promise<void> => {
    try {
      // Check if the user has applied for the job
      const applicationStatus = await jobApi.checkApplicationStatus(
        userId,
        jobId
      );
      if (!applicationStatus) {
        throw new Error("You haven't applied for this job.");
      }

      // Reference to the user document
      const userDocRef = doc(db, "user", userId);

      // Remove the jobId from the appliedJobs array
      await updateDoc(userDocRef, {
        appliedJobs: arrayRemove(jobId), // Removes the jobId from the array
      });

      console.log(`User ${userId} withdrew their application for job ${jobId}`);
    } catch (error) {
      console.error("Error withdrawing application:", error);
      throw error;
    }
  },
};

export default jobApi;
