import { Repository } from '@/src/interfaces/Repository/Repository';
import { ProgrammingLanguage } from '~/src/interfaces/ProgrammingLanguage/ProgrammingLanguage';

const getMainProgrammingLanguage = (
  repository: Repository
): ProgrammingLanguage | void => {
  const { programmingLanguages } = repository;

  const sortedProportions = programmingLanguages.sort(
    (a, b) => Number(b.usagePercent) - Number(a.usagePercent)
  );

  const [mainLang] = sortedProportions;

  return mainLang;
};

export default getMainProgrammingLanguage;
