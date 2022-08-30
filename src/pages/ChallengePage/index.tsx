import { BoardProvider } from "contexts";
import { Board } from "./Board";

const MOCK_LISTS = [
  { name: "To Do", id: "1" },
  { name: "In Progress", id: "2" },
  { name: "Done", id: "3" },
];

const MOCK_TASKS = [
  {
    id: "0a2b9602-1391-4405-b913-94834e750ccf",
    description: "Mow the Lawn",
    list: "1",
  },
  {
    id: "220aa86a-0762-45f3-8e52-fee358e2648e",
    description: "Pull Weeds",
    list: "2",
  },
  {
    id: "bea44afd-22f5-4357-ba88-9c4ba8b56e6b",
    description: "Rake the Leaves",
    list: "3",
  },
];

function ChallengePage() {
  return (
    <BoardProvider initialLists={MOCK_LISTS} initialTasks={MOCK_TASKS}>
      <Board />
    </BoardProvider>
  );
}

export { ChallengePage };
