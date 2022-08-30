import { render, screen, within } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

import { BoardProvider } from "contexts/BoardContext";
import { Board } from "..";

const MOCK_LISTS = [
  {
    id: "1a",
    name: "first list",
  },
  {
    id: "2b",
    name: "second list",
  },
];

const MOCK_TASKS = [
  {
    id: "zzz-xxx-yyy",
    description: "Walk the dog",
    list: "1a",
  },
  {
    id: "qqq-www-eee",
    description: "Pet the cat",
    list: "2b",
  },
  {
    id: "jjj-kkk-lll",
    description: "Feed the fish",
    list: "2b",
  },
];

function findTasksByList(list: string | RegExp) {
  let foundList = screen.getByRole("list", { name: list });
  let listTasks = within(foundList).getAllByRole("listitem");
  return listTasks;
}

test("can add tasks and move them", async () => {
  render(
    <BoardProvider initialLists={MOCK_LISTS} initialTasks={MOCK_TASKS}>
      <Board />
    </BoardProvider>
  );

  const lists = within(
    screen.getByRole("list", { name: /lists container/i })
  ).getAllByRole("list");

  expect(lists).toHaveLength(MOCK_LISTS.length);

  // lists should have the right number of tasks
  expect(findTasksByList(/first list/i)).toHaveLength(1);
  expect(findTasksByList(/second list/i)).toHaveLength(2);

  UserEvent.type(
    screen.getByRole("textbox", {
      name: /task description/i,
    }),
    "my new task"
  );
  UserEvent.click(screen.getByRole("button", { name: /add/i }));

  // a new task was added, so first list should have two tasks now
  const firstListTasks = findTasksByList(/first list/i);
  expect(firstListTasks).toHaveLength(2);

  expect(
    within(firstListTasks[0]).getByRole("button", {
      name: /move to previous list/i,
    })
  ).toBeDisabled();

  // first task of first list was moved to second list now
  UserEvent.click(
    within(firstListTasks[0]).getByRole("button", {
      name: /move to next list/i,
    })
  );

  // second list should have three tasks now
  const secondListTasks = findTasksByList(/second list/i);
  expect(secondListTasks).toHaveLength(3);

  // next button on second list tasks should be disabled
  expect(
    within(secondListTasks[0]).getByRole("button", {
      name: /move to next list/i,
    })
  ).toBeDisabled();

  // task was moved back to first list
  UserEvent.click(
    within(secondListTasks[0]).getByRole("button", {
      name: /move to previous list/i,
    })
  );

  // both lists should have the right number of tasks
  expect(findTasksByList(/first list/i)).toHaveLength(2);
  expect(findTasksByList(/second list/i)).toHaveLength(2);
});
