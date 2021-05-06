export interface ProgrammingLanguageDTO {
  id: number;
  name: string;
  icon: null;
}

export interface ProgrammingLanguage {
  id: number;
  name: string;
  icon: null;
  usagePercent?: number;
}

export interface RepoProgrammingLanguageDTO extends ProgrammingLanguageDTO {
  // eslint-disable-next-line camelcase
  usage_percent: number;
}

export interface RepoProgrammingLanguage extends ProgrammingLanguage {
  usagePercent: number;
}
