import { Repository } from '@/src/interfaces/Repository/Repository';

const getRepoProgrammingLanguage = (
  repository: Repository
): [string, string] | void => {
  const { programmingLanguages } = repository;

  const sortedProportions = Object.values(programmingLanguages).sort(
    (a, b) => Number(b) - Number(a)
  );

  const language = Object.entries(programmingLanguages).find(
    ([_, val]) => Number(val) >= Number(sortedProportions[0])
  );

  return language;
};

export default getRepoProgrammingLanguage;
