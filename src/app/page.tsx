import LoginButton from "@/components/LoginButton";
import TaskList from "@/components/TaskList";
import { gqlFetch } from "@/lib/graphql";
import Link from "next/link";

type Task = {
  _id: string;
  title: string;
  status: string;
  description?: string;
};

async function getPublicTasks(): Promise<Task[]> {
  const query = `
    query { taskList { _id title status description } }
  `;
  const data = await gqlFetch<{ taskList: Task[] }>(query);
  return data.taskList;
}

export default async function HomePage() {
  const tasks = await getPublicTasks();

  if (!tasks.length) return <p>No public tasks found</p>;

  return (
    <main>
      <h1>Public Tasks</h1>

      <section className="mt-6  ">
        <TaskList tasks={tasks} />
      </section>
    </main>
  );
}
