import { Repository } from '@/src/interfaces/Repository/Repository';
import { RepoProgrammingLanguage } from '@/src/interfaces/ProgrammingLanguage';

const getRepoMainProgrammingLanguage = (
  repository: Repository
): RepoProgrammingLanguage | void => {
  const { programmingLanguages } = repository;

  const sortedByPercents = programmingLanguages.sort(
    (a, b) => Number(b.usage_percent) - Number(a.usage_percent)
  );

  return sortedByPercents[0];
};

export default getRepoMainProgrammingLanguage;
