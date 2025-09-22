const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || "https://asktask-api.stagelab.co.uk/graphql";

export async function gqlFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Network error ${res.status}: ${await res.text()}`);

  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors.map(e => e.message).join(", "));

  return json.data as T;
}
