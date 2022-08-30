import React, { useState } from "react";
import { useBoard } from "contexts";

interface FormElements extends HTMLFormControlsCollection {
  description: HTMLInputElement;
}

interface TaskFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function TaskForm() {
  const [error, setError] = useState(false);
  const { addTask } = useBoard();

  const handleSubmit = (e: React.FormEvent<TaskFormElement>) => {
    e.preventDefault();
    setError(false);

    const taskDescription = e.currentTarget.elements.description;

    if (!taskDescription.value) {
      setError(true);
      return;
    }

    addTask(taskDescription.value);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="description"
        aria-label="Task description"
        placeholder="Add Task"
      />
      {error && <p>You must enter a description</p>}
      <button type="submit">add</button>
    </form>
  );
}

export { TaskForm };
