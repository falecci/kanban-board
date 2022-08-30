import { useBoard } from "contexts";
import { List } from "../List";
import { TaskForm } from "../TaskForm";

import "./styles.css";

function Board() {
  const { lists } = useBoard();

  return (
    <div className="board">
      <ol aria-label="Lists container" className="lists-container">
        {lists.map((list, i) => (
          <List key={list.id} index={i} name={list.name} id={list.id} />
        ))}
      </ol>

      <TaskForm />
    </div>
  );
}

export { Board };
