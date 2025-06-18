"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { editPromo, getPromoById } from "@/app/lib/promo/actionpromo";

export default function EditPromoPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    client_id: "",
    eligible: false,
    status: "",
    promo_code: "",
  });

  useEffect(() => {
    const fetchPromo = async () => {
      const promo = await getPromoById(Number(params.id));
      if (promo) {
        setFormData({
          email: promo.email,
          client_id: promo.client_id,
          eligible: promo.eligible,
          status: promo.status,
          promo_code: promo.promo_code,
        });
      }
      setLoading(false);
    };
    fetchPromo();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await editPromo({ id: Number(params.id), ...formData });
    if (result.success) {
      alert(result.success);
      router.push("/dashboard/promo-code");
    } else {
      alert(result.error || "Update failed.");
    }
  };

  if (loading) return <p className="p-4">Loading promo data...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Edit Promo Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Client ID"
          value={formData.client_id}
          onChange={(e) =>
            setFormData({ ...formData, client_id: e.target.value })
          }
        />
        <select
          className="w-full border px-3 py-2 rounded"
          value={formData.eligible ? "yes" : "no"}
          onChange={(e) =>
            setFormData({ ...formData, eligible: e.target.value === "yes" })
          }
        >
          <option value="yes">Eligible</option>
          <option value="no">Not Eligible</option>
        </select>
        <select
          className="w-full border px-3 py-2 rounded"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Promo Code"
          value={formData.promo_code}
          onChange={(e) =>
            setFormData({ ...formData, promo_code: e.target.value })
          }
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
