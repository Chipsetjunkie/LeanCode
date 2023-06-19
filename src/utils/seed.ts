import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/setup";

function* getDataToBeWritten() {
  const problemList = [
    {
      id: "TWO_SUM",
      title: "Two Sum",
      difficulty: "medium",
      category: "Array",
    },
    {
      id: "REVERSE_LINKED_LIST",
      title: "Reverse Linked List",
      difficulty: "hard",
      category: "Linked List",
    },
    {
      id: "JUMP_GAME",
      title: "Jump Game",
      difficulty: "medium",
      category: "Dynamic Programming",
    },
    {
      id: "VALID_PARENTHESES",
      title: "Valid Parentheses",
      difficulty: "easy",
      category: "Stack",
    },
    {
      id: "SEARCH_A_2D_MATRIX",
      title: "Search a 2d Matrix",
      difficulty: "medium",
      category: "Binary Search",
    },
  ];

  for (let problem of problemList) {
    yield problem;
  }
}

export const seedDatabase = () => {
  const gen = getDataToBeWritten();
  async function writeToFirestore(data: any, gen: any) {
    await setDoc(doc(db, "ProblemList", data.value.id), { ...data.value });
    const _data = gen.next();
    if (!_data.done) {
      return writeToFirestore(_data, gen);
    }

    console.log("All Data written")
  }

  writeToFirestore(gen.next(), gen);
};

export const deleteDocument = () => {
  const gen = getDataToBeWritten();
  async function deleteDocument(data: any, gen: any) {
    await deleteDoc(doc(db, "ProblemList", data.value.id));
    const _data = gen.next();
    if (!_data.done) {
      return deleteDocument(_data, gen);
    }
    console.log("All deleted!!");
  }

  deleteDocument(gen.next(), gen);
};
