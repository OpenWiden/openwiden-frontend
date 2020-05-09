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
    versionControlService: repository.version_control_service,
    starsCount: repository.stars_count,
    openIssuesCount: repository.open_issues_count,
    forksCount: repository.forks_count,
    createdAt: repository.created_at,
    updatedAt: repository.updated_at,
    programmingLanguage: repository.programming_language,
  };
}
