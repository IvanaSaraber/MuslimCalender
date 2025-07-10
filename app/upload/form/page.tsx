"use client";

import { useState } from "react";

const cities = [
  "Alkmaar", "Almelo", "Almere", "Alphen aan den Rijn", "Amersfoort", "Amsterdam",
  "Apeldoorn", "Arnhem", "Assen", "Bergen op Zoom", "Breda", "Delft", "Den Haag",
  "Deventer", "Dordrecht", "Doetinchem", "Ede", "Eindhoven", "Emmen", "Enschede",
  "Gouda", "Groningen", "Haarlem", "Haarlemmermeer", "Heerlen", "Helmond", "Hoorn",
  "Katwijk", "Leeuwarden", "Leiden", "Lelystad", "Maastricht", "Middelburg",
  "Nieuwegein", "Nijmegen", "Oss", "Overig", "Purmerend", "Rijswijk", "Roosendaal",
  "Rotterdam", "Sittard-Geleen", "s-Hertogenbosch", "Tilburg", "Utrecht", "Veenendaal",
  "Venlo", "Westland", "Zaandstad", "Zeist", "Zoetermeer", "Zwolle"
].sort();

export default function UploadFormPage() {
  const [formData, setFormData] = useState({
    EventName: "",
    Description: "",
    EventType: "",
    Date: "",
    StartTime: "",
    EndTime: "",
    City: "",
    Address: "",
    Gender: "",
    Language: "",
    Organisation: "",
    Speaker: "",
    Speaker2: "",
    Speaker3: "",
    Speaker4: "",
    Comments: "",
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
        Address: "",
        Gender: "",
        Language: "",
        Organisation: "",
        Speaker: "",
        Speaker2: "",
        Speaker3: "",
        Speaker4: "",
        Comments: "",
      });
    }

    setSubmitting(false);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-2xl mt-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Voeg een evenement toe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Name */}
        <div>
          <label className="block font-medium mb-1">Naam van het event <span className="text-red-500">*</span></label>
          <input name="EventName" required value={formData.EventName} onChange={handleChange} className="w-full p-3 border rounded" />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Beschrijving <span className="text-red-500">*</span></label>
          <textarea name="Description" required value={formData.Description} onChange={handleChange} className="w-full p-3 border rounded" />
        </div>

        {/* Event Type */}
        <div>
          <label className="block font-medium mb-1">Type (iftar, lezing...) <span className="text-red-500">*</span></label>
          <input name="EventType" required value={formData.EventType} onChange={handleChange} className="w-full p-3 border rounded" />
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium mb-1">Datum <span className="text-red-500">*</span></label>
          <input type="date" name="Date" required value={formData.Date} onChange={handleChange} className="w-full p-3 border rounded" />
        </div>

        {/* Time */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="StartTime" className="block font-medium mb-1">Starttijd <span className="text-red-500">*</span></label>
            <input type="time" name="StartTime" required value={formData.StartTime} onChange={handleChange} className="w-full p-3 border rounded" />
          </div>
          <div className="flex-1">
            <label htmlFor="EndTime" className="block font-medium mb-1">Eindtijd <span className="text-red-500">*</span></label>
            <input type="time" name="EndTime" required value={formData.EndTime} onChange={handleChange} className="w-full p-3 border rounded" />
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block font-medium mb-1">Stad <span className="text-red-500">*</span></label>
          <input list="city-options" name="City" required value={formData.City} onChange={handleChange} className="w-full p-3 border rounded" />
          <datalist id="city-options">
            {cities.map((city) => <option key={city} value={city} />)}
          </datalist>
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Adres <span className="text-red-500">*</span></label>
          <input name="Address" required value={formData.Address} onChange={handleChange} className="w-full p-3 border rounded" />
        </div>

        {/* Speakers */}
        <div>
          <label className="block font-medium mb-1">Spreker(s) <span className="text-red-500">*</span></label>
          <input name="Speaker" required value={formData.Speaker} onChange={handleChange} className="w-full p-3 border rounded mb-2" />
          <input name="Speaker2" placeholder="Spreker 2 (optioneel)" value={formData.Speaker2} onChange={handleChange} className="w-full p-3 border rounded mb-2" />
          <input name="Speaker3" placeholder="Spreker 3 (optioneel)" value={formData.Speaker3} onChange={handleChange} className="w-full p-3 border rounded mb-2" />
          <input name="Speaker4" placeholder="Spreker 4 (optioneel)" value={formData.Speaker4} onChange={handleChange} className="w-full p-3 border rounded" />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium mb-1">Doelgroep</label>
          <select name="Gender" value={formData.Gender} onChange={handleChange} className="w-full p-3 border rounded">
            <option value="">Kies doelgroep</option>
            <option value="gemengd">Gemengd</option>
            <option value="mannen">Mannen</option>
            <option value="vrouwen">Vrouwen</option>
            <option value="overig">Overig</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block font-medium mb-1">Taal</label>
          <select name="Language" value={formData.Language} onChange={handleChange} className="w-full p-3 border rounded">
            <option value="">Kies een taal</option>
            <option value="Nederlands">Nederlands</option>
            <option value="Arabisch">Arabisch</option>
            <option value="Engels">Engels</option>
            <option value="overig">Overig</option>
          </select>
        </div>

        {/* Organisation */}
        <div>
          <label className="block font-medium mb-1">Naam organisatie</label>
          <input name="Organisation" value={formData.Organisation} onChange={handleChange} className="w-full p-3 border rounded" />
        </div>

        {/* Comments */}
        <div>
          <label className="block font-medium mb-1">Opmerkingen (bijv. route of instructies)</label>
          <textarea name="Comments" value={formData.Comments} onChange={handleChange} className="w-full p-3 border rounded" />
        </div>

        {/* Submit */}
        <button disabled={submitting} type="submit" className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
          {submitting ? "Versturen..." : "Verstuur"}
        </button>

        {success && <p className="text-green-600 text-center">✅ Evenement succesvol toegevoegd!</p>}
      </form>
    </main>
  );
}
