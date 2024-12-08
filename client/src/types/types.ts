export interface User {
  _id: string;
  email: string;
  name: string;
  password?: string;
  role: string;
  superuser?: boolean;
  createdAt?: string;
  updatedAt?: string;
  assignedTo?: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "Completed" | "" | "Approved" | "Rejected";
  createdAt?: string | Date;
  createdBy?: string;
  assignedTo?: User | string;
}
