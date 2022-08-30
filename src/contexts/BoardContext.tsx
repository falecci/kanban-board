import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Direction } from "types";

function generateTaskId() {
  return uuidv4();
}

function noop() {}

type List = {
  name: string;
  id: string;
};

type Task = {
  description: string;
  list: List["id"];
  id: string;
};

type AddTaskFn = (description: string) => void;
type MoveTaskFn = (taskId: string, direction: Direction) => void;

type BoardContextType = {
  lists: List[];
  tasks: Task[];
  addTask: AddTaskFn;
  moveTask: MoveTaskFn;
};

const BoardContext = React.createContext<BoardContextType>({
  lists: [],
  tasks: [],
  addTask: noop,
  moveTask: noop,
});

type BoardProps = {
  initialLists?: List[];
  initialTasks?: Task[];
};

const BoardProvider: React.FC<BoardProps> = ({
  children,
  initialLists = [],
  initialTasks = [],
}) => {
  const [lists] = useState<List[]>(initialLists);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask: AddTaskFn = function (description) {
    const initialTaskListId = lists[0]?.id;

    if (!initialTaskListId) {
      throw new Error("There must be a list first before creating any task.");
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      { description, list: initialTaskListId, id: generateTaskId() },
    ]);
  };

  const moveTask: MoveTaskFn = function (taskId, direction) {
    setTasks((prevTasks) => {
      const taskToMove = prevTasks.find((t) => t.id === taskId);

      if (!taskToMove) {
        return prevTasks;
      }

      const currentListIndex = lists.findIndex((l) => l.id === taskToMove.list);
      const updatedList =
        lists[currentListIndex + (direction === "prev" ? -1 : 1)];

      if (!updatedList) {
        return prevTasks;
      }

      return prevTasks.map((task) =>
        task.id === taskId ? { ...task, list: updatedList.id } : task
      );
    });
  };

  return (
    <BoardContext.Provider value={{ lists, tasks, addTask, moveTask }}>
      {children}
    </BoardContext.Provider>
  );
};

const useBoard = (): BoardContextType => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("You must be within a BoardProvider to use useBoard hook.");
  }

  return context;
};

export { useBoard, BoardProvider };
