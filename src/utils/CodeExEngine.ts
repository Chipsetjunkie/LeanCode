//TODO: move computation to worker thread
//TODO: clean up logic

type TestCaseResultsObjectType = {
  expected: string;
  got: string;
  status: boolean;
};

type OperationResultType = {
  logs: string;
  testCaseResults: TestCaseResultsObjectType;
  input: any;
};

export interface CodeExecutionReturnType {
  operationResults: OperationResultType[];
  status: boolean;
  runTime: number;
}

export interface ErrorType {
  error: boolean;
  message: any;
}

export interface CodeExecution {
  execute(codeSnippet: string): CodeExecutionReturnType | ErrorType;
}

export default class CodeExecutionEngine implements CodeExecution {
  input: any[];
  functionName: string;

  constructor(input: any, functionName: string) {
    this.input = input;
    this.functionName = functionName;
  }

  execute(codeSnippet: string, isTest = false) {
    const testcasesResults: TestCaseResultsObjectType[] = [];
    const logs: string[] = [];
    let testPassedStatus = true;

    const windowLog = console.log;
    const windowError = console.error;
    console.error = function(){}
    console.log = function (...args) {
      // windowLog(...args);
      logs.push(`${[...args]}`);
    };

    const startTime = performance.now();
    try {
      for (let i = 0; i < (isTest ? 2 : this.input.length); i++) {
        const input = this.input[i].inputs;
        const answer = this.input[i].answers;
        const handlerFunction = new Function(
          "input",
          `function run(){ ${codeSnippet} return ${this.functionName}(input)} return run()`
        );
        const result = handlerFunction(input);
        const status = result === answer;
        testcasesResults.push({
          expected: answer,
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
    const endTime = performance.now() - startTime;
    const operationResults: OperationResultType[] = [];
    
    for (let i = 0; i < (isTest ? 2 : this.input.length); i++) {
      operationResults.push({
        logs: logs[i] || "",
        testCaseResults: testcasesResults[i],
        input: this.input[i],
      });
    }

    return {
      operationResults,
      status: testPassedStatus,
      runTime: endTime,
    };
  }
}
