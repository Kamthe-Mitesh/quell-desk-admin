// Type definitions
export interface Complaint {
  id: string;
  title: string;
  subject: string;
  images: string[];
  status: "unresolved" | "in-progress" | "resolved";
  createdAt: string;
  updatedAt: string;
  userId: string;
  assignedTo?: string;
  assignedWorkerType?: "cleaner" | "plumber" | "electrician";
  submittedBy?: {
    name: string;
    email: string;
    location: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  wing: string;
  floor: string;
  flat: string;
  verificationStatus: "unverified" | "verified";
  role?: "admin" | "user";
}

// Import JSON data
import complaintsData from "@/data/complaints.json";
import userData from "@/data/user.json";
import usersData from "@/data/users.json";

// Complaint functions
export function getComplaints(): Complaint[] {
  return complaintsData as Complaint[];
}

export function getComplaintById(id: string): Complaint | undefined {
  const complaints = getComplaints();
  return complaints.find((complaint) => complaint.id === id);
}

export function addComplaint(complaint: Omit<Complaint, "id" | "createdAt" | "updatedAt">): Complaint {
  // In a real app, this would write to a database or API
  // For now, we'll just create the complaint object
  const newComplaint: Complaint = {
    ...complaint,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  // Note: In a client-side only app, we can't persist this to the JSON file
  // In production, this would call an API endpoint
  console.log("New complaint created:", newComplaint);
  return newComplaint;
}

// User functions
export function getUser(): User {
  return userData as User;
}

export function updateUser(updatedUser: Partial<User>): User {
  // In a real app, this would write to a database or API
  const currentUser = getUser();
  const newUser = { ...currentUser, ...updatedUser };
  
  // Note: In a client-side only app, we can't persist this to the JSON file
  // In production, this would call an API endpoint
  console.log("User updated:", newUser);
  return newUser;
}

// Verification helper functions
export function isProfileComplete(user: User): boolean {
  // Check if all required fields are filled
  return !!(
    user.phone &&
    user.wing &&
    user.floor &&
    user.flat &&
    user.phone.trim() !== "" &&
    user.wing.trim() !== "" &&
    user.floor.trim() !== "" &&
    user.flat.trim() !== ""
  );
}

export function isUserVerified(user: User): boolean {
  return user.verificationStatus === "verified";
}

export function canSubmitComplaints(user: User): boolean {
  return isProfileComplete(user) && isUserVerified(user);
}

export function getVerificationMessage(user: User): string {
  if (!isProfileComplete(user)) {
    return "Please complete your profile (phone number, wing, floor, and flat number) to proceed.";
  }
  if (!isUserVerified(user)) {
    return "Your account is pending admin verification. You'll be able to submit complaints once verified.";
  }
  return "Your account is verified. You can submit complaints.";
}

// Admin user management functions
export function getAllUsers(): User[] {
  return usersData as User[];
}

export function verifyUser(userId: string): User | undefined {
  // In a real app, this would make an API call to update the user's verification status
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  
  if (user) {
    const updatedUser = { ...user, verificationStatus: "verified" as const };
    console.log("User verified:", updatedUser);
    return updatedUser;
  }
  
  return undefined;
}

export function deleteUser(userId: string): boolean {
  // In a real app, this would make an API call to delete the user
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    console.log("User deleted:", users[userIndex]);
    return true;
  }
  
  return false;
}

// Complaint management functions
export function assignWorkerToComplaint(
  complaintId: string,
  workerType: "cleaner" | "plumber" | "electrician",
  workerName: string
): Complaint | undefined {
  // In a real app, this would make an API call
  const complaint = getComplaintById(complaintId);
  
  if (complaint) {
    const updatedComplaint = {
      ...complaint,
      assignedTo: workerName,
      assignedWorkerType: workerType,
      updatedAt: new Date().toISOString(),
    };
    console.log("Worker assigned to complaint:", updatedComplaint);
    return updatedComplaint;
  }
  
  return undefined;
}

export function updateComplaintStatus(
  complaintId: string,
  newStatus: "unresolved" | "in-progress" | "resolved"
): Complaint | undefined {
  // In a real app, this would make an API call
  const complaint = getComplaintById(complaintId);
  
  if (complaint) {
    const updatedComplaint = {
      ...complaint,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    console.log("Complaint status updated:", updatedComplaint);
    return updatedComplaint;
  }
  
  return undefined;
}

export function getComplaintAge(createdAt: string): number {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function isComplaintUrgent(createdAt: string): boolean {
  return getComplaintAge(createdAt) > 30;
}
