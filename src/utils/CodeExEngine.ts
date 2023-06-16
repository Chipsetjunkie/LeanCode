//TODO: move computation to worker thread


type TestCaseResultsObjectType = {
  expected: string;
  got: string;
  status: boolean;
};

interface CodeExecutionReturnType {
  logs: string[];
  testcasesResults: TestCaseResultsObjectType[];
  status: boolean;
}

interface ErrorType {
  error: boolean;
  message: any;
}

interface CodeExecution {
  execute(codeSnippet: string): CodeExecutionReturnType | ErrorType;
}

export default class CodeExecutionEngine implements CodeExecution {
  input: any;
  output: any;
  functionName: string;

  constructor(input: any, output: any, functionName: string) {
    this.input = input;
    this.output = output;
    this.functionName = functionName;
  }

  execute(codeSnippet: string) {
    const testcasesResults = Array(this.input.length);
    const logs = Array(this.input.length).fill("");
    let testPassedStatus = true;

    const windowLog = console.log;
    console.log = function (...args: any) {
      windowLog(...args);
      logs.push(`${[...args]}`);
    };

    try {
      for (let i = 0; i < this.input.length; i++) {
        const handlerFunction = new Function(
          "input",
          `function run() {  ${codeSnippet} return ${this.functionName}()}`
        );
        const result = handlerFunction(this.input);
        const status = result === this.output[i];
        testcasesResults.push({
          expected: this.output[i],
          got: result,
          status,
        });
        if (!status) testPassedStatus = false;
      }
    } catch (e) {
      console.log = windowLog;
      return {
        error: true,
        message: e,
      };
    }

    console.log = windowLog;
    return {
      logs,
      testcasesResults,
      status: testPassedStatus,
    };
  }
}
