/* eslint-disable camelcase */

export interface IssueData {
  id?: string;
  title: string;
  description: string;
  state: string;
  labels: string;
  url: string;
  created_at: Date;
  closed_at?: Date;
  updated_at: Date;
}

export interface Issue {
  id?: string;
  title: string;
  description: string;
  state: string;
  labels: string;
  url: string;
  createdAt: Date;
  closedAt?: Date;
  updatedAt: Date;
}
