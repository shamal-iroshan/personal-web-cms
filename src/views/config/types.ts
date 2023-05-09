export interface Config {
  id: string;
  isActive: boolean;
  views: number;
  underMaintenance: boolean;
  homeTitle: string;
  animatedText: string[];
  aboutTitle: string;
  aboutDescription: string;
  name: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  email: string;
  aboutModalDescription: string;
  profileImageURL: string;
  cvURL: string;
  services: string[];
  programmingSkills: {
    name: string;
    value: number;
  }[];
  languageSkills: {
    name: string;
    value: number;
  }[];
  educations: {
    title: string;
    description: string;
    year: string;
  }[];
  works: {
    title: string;
    description: string;
    year: string;
  }[];
}

export interface AllConfigs {
  total: number;
  data: Config[];
}

export interface ConfigState {
  getConfigIsLoading: boolean;
  getConfigIsSuccess: boolean;
  getConfigError: { hasError: boolean; description: string };
  config: Config | undefined;
  getAllConfigIsLoading: boolean;
  getAllConfigIsSuccess: boolean;
  getAllConfigError: { hasError: boolean; description: string };
  allConfigs: AllConfigs;
  addConfigIsLoading: boolean;
  addConfigIsSuccess: boolean;
  addConfigError: { hasError: boolean; description: string };
  updateConfigIsLoading: boolean;
  updateConfigIsSuccess: boolean;
  updateConfigError: { hasError: boolean; description: string };
  deleteConfigIsLoading: boolean;
  deleteConfigIsSuccess: boolean;
  deleteConfigError: { hasError: boolean; description: string };
  setAsActiveLoading: boolean;
  setAsActiveIsSuccess: boolean;
  setAsActiveError: { hasError: boolean; description: string };
}
