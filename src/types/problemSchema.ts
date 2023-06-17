type ExamplesType = {
  id: number;
  inputText: string;
  outputText: string;
  explanation: string;
};

export type TestType = {
  inputs: any;
  answers: any;
};

type ProblemDescription = {
  id: string;
  difficulty: "medium" | "easy" | "hard";
  title: string;
  problemStatement: string;
  examples: ExamplesType[];
  constraints: string;
  starterCode: string;
  starterFunctionName: string;
}

export interface ProblemType {
  tests: TestType[];
  description: ProblemDescription
  position: number;
}
