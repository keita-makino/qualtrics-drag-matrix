export type Input = {
  htmlElement?: Element;
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
