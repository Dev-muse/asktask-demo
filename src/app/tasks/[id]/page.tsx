import { gqlFetch } from "@/lib/graphql";

type Task = {
  _id: string;
  title: string;
  status: string;
  description?: string;
};

async function getTaskById(id: string): Promise<Task | null> {
  const query = `
    query($filter: FilterFindOneTaskInput) {
      taskGet(filter: $filter) {
        _id
        title
        status
        description
      }
    }
  `;

  try {
    const data = await gqlFetch<{ taskGet: Task }>(query, {
      filter: { _id: id },
    });
    return data.taskGet;
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
}

export default async function TaskPage({ params }: { params: { id: string } }) {
  // params in App Router are already available synchronously
  const task = await getTaskById(params.id);

  if (!task) {
    return <p>Task not found or error fetching task.</p>;
  }

  return (
    <main>
      <h1>{task.title}</h1>
      <p>Status: {task.status}</p>
      <p>{task.description || "No description available"}</p>
    </main>
  );
}
