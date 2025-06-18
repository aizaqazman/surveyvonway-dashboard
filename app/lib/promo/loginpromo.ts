export async function loginPromo(email: string, password: string) {
  const res = await fetch(
    "https://secure.vonwayforex.com/client-api/login?version=1.0.0",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();

  return data.token;
}
