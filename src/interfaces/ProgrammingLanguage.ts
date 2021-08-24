/* eslint-disable camelcase */
export type ProgrammingLanguage = {
  id: number;
  name: string;
  icon?: string;
};

export interface RepoProgrammingLanguage extends ProgrammingLanguage {
  usage_percent: number;
}
