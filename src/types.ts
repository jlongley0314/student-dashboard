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
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: number;
};

export type Allergy = {
  id: string;
  severity: Severity;
  type: AllergyType;
  description: string;
};

export enum Severity {
  Low,
  Medium,
  High,
}

export enum AllergyType {
  Food,
  Medicine,
  Environmental,
}

export type Submission = {
  assignmentName: string;
  dueDate: Date;
  difficulty: number;
  teachersNotes: string;
};
