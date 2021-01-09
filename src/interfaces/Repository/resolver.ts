import { RepositoryData, Repository } from './Repository';

export default function repositoryResolver(
  repository: RepositoryData
): Repository {
  const { id, name, description, url, vcs } = repository;
  return {
    id,
    name,
    description,
    url,
    vcs,
    starsCount: repository.stars_count,
    openIssuesCount: repository.open_issues_count,
    forksCount: repository.forks_count,
    createdAt: repository.created_at,
    updatedAt: repository.updated_at,
    programmingLanguages: repository.programming_languages,
  };
}
