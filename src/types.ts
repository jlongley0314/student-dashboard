export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: Address;
  allergies: Allergy[];
  submissions: Submission[];
};

export type Address = {
  id: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: number;
};

export type Allergy = {
  id?: string;
  severity: Severity | string;
  type: AllergyType | string;
  description: string;
};

export enum Severity {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum AllergyType {
  Food = "Food",
  Medicine = "Medicine",
  Environmental = "Environmental",
}

export type Submission = {
  id: string;
  assignmentName: string;
  dueDate: string;
  difficulty: number;
  teachersNotes: string;
};
