"use client";

import { useState } from "react";

export default function UploadFormPage() {
  const [formData, setFormData] = useState({
    EventName: "",
    Description: "",
    EventType: "",
    Date: "",
    StartTime: "",
    EndTime: "",
    City: "",
    Location: "",
    Gender: "",
    Language: "",
    Organisation: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    const res = await fetch("/api/submit-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSuccess(true);
      setFormData({
        EventName: "",
        Description: "",
        EventType: "",
        Date: "",
        StartTime: "",
        EndTime: "",
        City: "",
        Location: "",
        Gender: "",
        Language: "",
        Organisation: "",
      });
    }

    setSubmitting(false);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center">Voeg een evenement toe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="EventName" placeholder="Naam van het event" value={formData.EventName} onChange={handleChange} required className="w-full p-3 border rounded" />
        <textarea name="Description" placeholder="Beschrijving" value={formData.Description} onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="EventType" placeholder="Type (iftar, lezing...)" value={formData.EventType} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="date" name="Date" value={formData.Date} onChange={handleChange} required className="w-full p-3 border rounded" />
        <input type="time" name="StartTime" value={formData.StartTime} onChange={handleChange} className="w-full p-3 border rounded" />
        <input type="time" name="EndTime" value={formData.EndTime} onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="City" placeholder="Stad" value={formData.City} onChange={handleChange} className="w-full p-3 border rounded" />
        <input name="Location" placeholder="Locatie" value={formData.Location} onChange={handleChange} className="w-full p-3 border rounded" />
        <select name="Gender" value={formData.Gender} onChange={handleChange} className="w-full p-3 border rounded">
          <option value="">Doelgroep</option>
          <option value="gemengd">Gemengd</option>
          <option value="mannen">Mannen</option>
          <option value="vrouwen">Vrouwen</option>
        </select>
        <select name="Language" value={formData.Language} onChange={handleChange} className="w-full p-3 border rounded">
          <option value="">Taal</option>
          <option value="Nederlands">Nederlands</option>
          <option value="Arabisch">Arabisch</option>
          <option value="Engels">Engels</option>
          <option value="overig">Overig</option>
        </select>
        <input name="Organisation" placeholder="Naam organisatie" value={formData.Organisation} onChange={handleChange} className="w-full p-3 border rounded" />
        <button disabled={submitting} type="submit" className="w-full bg-green-600 text-white py-3 rounded">
          {submitting ? "Versturen..." : "Verstuur"}
        </button>
        {success && <p className="text-green-600 text-center">✅ Evenement succesvol toegevoegd!</p>}
      </form>
    </main>
  );
}
