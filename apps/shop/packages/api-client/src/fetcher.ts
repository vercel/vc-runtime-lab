const DEFAULT_BASE_URL =
  typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SHELL_URL ?? 'http://localhost:3000'

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  baseUrl = DEFAULT_BASE_URL,
): Promise<T> {
  const url = `${baseUrl}${path}`
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  })
  if (!res.ok) throw new Error(`API ${url} returned ${res.status}`)
  return res.json() as Promise<T>
}
