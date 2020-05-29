import { RepositoryData, Repository } from './Repository';

export default function repositoryResolver(
  repository: RepositoryData
): Repository {
  const { id, name, description, url } = repository;
  return {
    id,
    name,
    description,
    url,
    vcs: repository.vcs,
    starsCount: repository.stars_count,
    openIssuesCount: repository.open_issues_count,
    forksCount: repository.forks_count,
    createdAt: repository.created_at,
    updatedAt: repository.updated_at,
    programmingLanguage: repository.programming_language,
  };
}
