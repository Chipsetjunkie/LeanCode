//TODO: move computation to worker thread
//TODO: clean up logic
import equal from "deep-equal";

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

  parseInput(input: any, inputProcessor: any) {
    if (!inputProcessor) return input;
  }

  createExecutionFunction(input: any[], codeSnippet: string) {
    const Inputs = [];
    for (let i in input) {
      Inputs.push(`input${i + 1}`);
    }

    return new Function(
      ...Inputs,
      `function run(){ ${codeSnippet} return ${this.functionName}(${Inputs})} return run()`
    );
  }

  execute(codeSnippet: string, isTest = false) {
    const testcasesResults: TestCaseResultsObjectType[] = [];
    const logs: string[] = [];
    let testPassedStatus = true;

    const windowLog = console.log;
    console.log = function (...args) {
      // windowLog(...args);
      logs.push(`${[...args]}`);
    };

    const startTime = performance.now();
    try {
      for (let i = 0; i < (isTest ? 2 : this.input.length); i++) {
        const input = this.input[i].inputs;
        const answer = this.input[i].answers;
        const handlerFunction = this.createExecutionFunction(input, codeSnippet)
        const result = handlerFunction(...input);
        const status = equal(result, answer);
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
