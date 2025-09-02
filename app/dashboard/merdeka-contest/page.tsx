// app/leaderboard/page.tsx
import React from "react";

type LeaderboardEntry = {
  login: number;
  fullName: string;
  country: string;
  performance: number | string;
  nickname: string | null;
};

const CONTEST_ID = 16;

// Use env in dev/prod. e.g. NEXT_PUBLIC_API_BASE=http://localhost:5000
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5000";

async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const res = await fetch(`${API_BASE}/merdeka-contest/leaderboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contestId: CONTEST_ID,
      segment: { limit: 10, offset: 0 },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch leaderboard: ${res.status} ${text}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default async function LeaderboardPage() {
  const entries = await getLeaderboard();

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>
        Merdeka Contest Leaderboard
      </h1>
      <p style={{ textAlign: "center", color: "#555" }}>
        Contest ID: {CONTEST_ID}
      </p>

      <table
        border={1}
        cellPadding={8}
        style={{ width: "100%", marginTop: 16, borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Rank</th>
            <th>Full Name</th>
            <th>Country</th>
            <th>Login</th>
            <th>Performance</th>
            <th>Nickname</th>
          </tr>
        </thead>
        <tbody>
          {entries.slice(0, 10).map((e, i) => {
            const n = Number(e.performance);
            const perf = Number.isFinite(n) ? `${Math.round(n)}%` : String(e.performance ?? "");
            return (
              <tr key={e.login}>
                <td>#{i + 1}</td>
                <td>{e.fullName ?? "N/A"}</td>
                <td>{e.country ?? "N/A"}</td>
                <td>{e.login ?? "N/A"}</td>
                <td>{perf}</td>
                <td>{e.nickname ?? "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
