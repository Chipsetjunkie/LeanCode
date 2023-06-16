type ExamplesType = {
  id: number;
  inputText: string;
  outputText: string;
  explanation: string;
};

export interface ProblemType {
  tests: any[];
  answers: any[];
  id: string;
  difficulty: "medium" | "easy" | "hard";
  title: string;
  problemStatement: string;
  examples: ExamplesType[];
  constraints: string;
  starterCode: string;
  starterFunctionName: string;
  position: 3;
}
