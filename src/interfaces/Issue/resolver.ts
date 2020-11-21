import { IssueData, Issue } from './Issue';

export default function issueResolver(issue: IssueData): Issue {
  const { id, title, description, state, labels, url } = issue;

  return {
    id,
    title,
    description,
    state,
    labels,
    url,
    createdAt: issue.created_at,
    closedAt: issue.closed_at,
    updatedAt: issue.updated_at,
  };
}
