// src/app/admin/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { gqlFetch } from "@/lib/graphql";
import { GET_USER_TASKS } from "@/lib/queries";

type Task = {
  id: string;
  title: string;
  status: string;
  description?: string;
};

async function getUserTasks(token: string): Promise<Task[]> {
  const data = await gqlFetch<{ getUserTasks: Task[] }>(GET_USER_TASKS, {}, token);
  return data.getUserTasks;
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  console.log("AdminPage session:", session);

  if (!session) {
    return (
      <main>
        <h1>Admin Dashboard</h1>
        <p>You must be logged in to view your tasks.</p>
      </main>
    );
  }

  if (!session.graphqlToken) {
    return (
      <main>
        <h1>Admin Dashboard</h1>
        <p>Fetching tasks failed. Your session is missing the GraphQL token. Please log out and log in again.</p>
      </main>
    );
  }

  let tasks: Task[] = [];
  try {
    tasks = await getUserTasks(session.graphqlToken);
  } catch (err) {
    console.error("Server error fetching user tasks:", err);
  }

  return (
    <main>
      <h1>Admin Dashboard</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.status}
              {task.description && <p>{task.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
