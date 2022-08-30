import { useBoard } from "contexts";
import { Task } from "components";
import { useTasksByList } from "utils";

import "./styles.css";

type Props = {
  name: string;
  id: string;
  index: number;
};

function List({ name, index, id }: Props) {
  const { moveTask, lists } = useBoard();
  const tasks = useTasksByList(id);

  return (
    <li className="list-item">
      <h1 style={{ textAlign: "center" }}>{name}</h1>

      <ul aria-label={`${name} list`} className="tasks-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <Task
              description={task.description}
              onNextClick={() => moveTask(task.id, "next")}
              onPreviousClick={() => moveTask(task.id, "prev")}
              isNextEnabled={index < lists.length - 1}
              isPreviousEnabled={index > 0}
            />
          </li>
        ))}
      </ul>
    </li>
  );
}

export { List };
