export type Input = {
  htmlElement?: HTMLInputElement;
  selected: boolean;
  location: {
    row: number;
    column: number;
  };
};

export type ChoiceRow = {
  label: string;
};

export type Choice = {
  label: string;
  value: number;
};
