import { ProblemType } from "@/types/problemSchema";

const starterCodeJumpGameJS = `function canJump(nums) {
  // Write your code here
};`;

const jumpGame: ProblemType = {
  tests: [
    { inputs: [2, 3, 1, 1, 4], answers: true },
    { inputs: [3, 2, 1, 0, 4], answers: false },
    { inputs: [2, 0, 0], answers: true },
    { inputs: [2, 5, 0, 0], answers: true },
  ],
  description: {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "medium",
    problemStatement: `<p class='mt-3'>
      You are given an integer array <code>nums</code>. You are initially positioned at the <strong>first index</strong>
      and each element in the array represents your maximum jump length at that position.
    </p>
      <p class='mt-3'>
      Return <code>true</code> if you can reach the last index, or <code>false</code> otherwise.
      </p>
    `,

    examples: [
      {
        id: 0,
        inputText: `[2,3,1,1,4]`,
        outputText: `true`,
        explanation:
          "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
      },
      {
        id: 1,
        inputText: `[3,2,1,0,4]`,
        outputText: `false`,
        explanation:
          "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
      },
    ],
    constraints: `<li class='constrain_list_item'><code>1 <= nums.length <= 10^4</code></li>
      <li class="constrain_list_item"><code>0 <= nums[i] <= 10^</code></li>`,
    starterCode: starterCodeJumpGameJS,
    starterFunctionName: "canJump",
  },
  position: 3,
};

export default jumpGame;
