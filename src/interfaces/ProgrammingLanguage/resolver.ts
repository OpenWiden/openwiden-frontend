/* eslint-disable camelcase */
import {
  RepoProgrammingLanguage,
  RepoProgrammingLanguageDTO,
} from '../ProgrammingLanguage/ProgrammingLanguage';

export function repoProgrammingLangResolver(
  programmingLanguage: RepoProgrammingLanguageDTO
): RepoProgrammingLanguage {
  const { usage_percent, id, name, icon } = programmingLanguage;

  return {
    id,
    name,
    icon,
    usagePercent: usage_percent,
  };
}
