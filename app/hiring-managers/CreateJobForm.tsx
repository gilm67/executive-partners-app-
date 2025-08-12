"use client";

import { useState } from "react";

export default function CreateJobForm() {
  const [formData, setFormData] = useState({
    Title: "",
    Location: "",
    Market: "",
    Seniority: "",
    Summary: "",
    Confidential: "NO",
    Active: "TRUE",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");

    const res = await fetch("/api/jobs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.ok) {
      setStatus("✅ Job created successfully!");
      setFormData({
        Title: "",
        Location: "",
        Market: "",
        Seniority: "",
        Summary: "",
        Confidential: "NO",
        Active: "TRUE",
      });
    } else {
      setStatus(`❌ Error: ${data.error || "Failed to create job"}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold">Post a New Job</h2>
      <input className="border p-2 w-full" placeholder="Title" name="Title" value={formData.Title} onChange={handleChange} required />
      <input className="border p-2 w-full" placeholder="Location" name="Location" value={formData.Location} onChange={handleChange} />
      <input className="border p-2 w-full" placeholder="Market" name="Market" value={formData.Market} onChange={handleChange} />
      <input className="border p-2 w-full" placeholder="Seniority" name="Seniority" value={formData.Seniority} onChange={handleChange} />
      <textarea className="border p-2 w-full" placeholder="Summary" name="Summary" value={formData.Summary} onChange={handleChange} />
      <select className="border p-2 w-full" name="Confidential" value={formData.Confidential} onChange={handleChange}>
        <option value="NO">NO</option>
        <option value="YES">YES</option>
      </select>
      <select className="border p-2 w-full" name="Active" value={formData.Active} onChange={handleChange}>
        <option value="TRUE">TRUE</option>
        <option value="FALSE">FALSE</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Create Job</button>
      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}

