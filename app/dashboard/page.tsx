// app/dashboard/page.tsx
import { getUserCount } from "../lib/survey/user-stats";
import { getUserApproved } from "../lib/survey/user-stats";
import { getUserRejected } from "../lib/survey/user-stats";

export default async function DashboardPage() {
  const userCount = await getUserCount();
  const userCount2 = await getUserApproved();
  const userCount3 = await getUserRejected();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Grid container with all 3 cards in 1 row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Total Users
          </h2>
          <p className="text-3xl font-bold text-blue-600">{userCount}</p>
        </div>

        {/* Card 2 */}
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Total Approved Users
          </h2>
          <p className="text-3xl font-bold text-blue-600">{userCount2}</p>
        </div>

        {/* Card 3 */}
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Total Rejected Users
          </h2>
          <p className="text-3xl font-bold text-blue-600">{userCount3}</p>
        </div>
      </div>
    </div>
  );
}
