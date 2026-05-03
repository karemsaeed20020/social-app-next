import Cookies from "js-cookie";

export async function clientApiFetch(url: string, options: RequestInit = {}) {
  const token = Cookies.get("token");

  let headers: HeadersInit = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  if (!(options.body instanceof FormData) && !("Content-Type" in headers)) {
    headers = { ...headers, "Content-Type": "application/json" };
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}
