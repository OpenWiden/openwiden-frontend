import repositoryResolver from '../Repository/resolver';
import { UserRepositoryData, UserRepository } from './UserRepository';

export default function userRepositoryResolver(
  repository: UserRepositoryData
): UserRepository {
  const { id, name, description, url, vcs, visibility } = repositoryResolver(
    repository
  );

  return {
    id,
    name,
    description,
    url,
    vcs,
    visibility,
    starsCount: repository.stars_count,
    openIssuesCount: repository.open_issues_count,
    forksCount: repository.forks_count,
    createdAt: repository.created_at,
    updatedAt: repository.updated_at,
    programmingLanguage: repository.programming_language,
    state: repository.state,
  };
}
