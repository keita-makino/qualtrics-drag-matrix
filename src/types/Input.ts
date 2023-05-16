export type Input = {
  label: string;
  htmlElement?: HTMLInputElement;
  choices: Choice[];
};

export type Choice = {
  label: string;
  value: number;
};
