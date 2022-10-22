export interface Config {
  id: string;
  website: string;
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
  education: {
    title: string;
    description: string;
    year: string;
  }[];
  work: {
    title: string;
    description: string;
    year: string;
  }[];
}
