export interface SurveyQuestion {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: {
    text: string;
  }[];
}
