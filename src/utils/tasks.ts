import { useBoard } from "contexts";

function useTasksByList(listId: string) {
  const { tasks } = useBoard();

  return tasks.filter((task) => task.list === listId);
}

export { useTasksByList };
