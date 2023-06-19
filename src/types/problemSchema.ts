type ExamplesType = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?:string
};

export type TestType = {
  inputs: any;
  answers: any;
};

//TODO: use generic type
type ProblemDescription = {
  id: string;
  difficulty: "medium" | "easy" | "hard";
  title: string;
  problemStatement: string;
  examples: ExamplesType[];
  constraints: string;
  starterCode: string;
  starterFunctionName: string;
  inputProcessor?: any
  outputProcessor?: any
}

export interface ProblemType {
  tests: TestType[];
  description: ProblemDescription
  position: number;
}
