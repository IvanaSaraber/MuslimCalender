"use client";

import { useState } from "react";
import { Clock, MapPin, CalendarDays, Building2, Users, FileText, Globe } from "lucide-react";

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
    Location: "",
    Gender: "",
    Language: "",
    Organisation: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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

  const InputWrapper = ({ label, icon: Icon, children, required }) => (
    <div className="relative">
      <label className="block font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />}
        {children}
      </div>
    </div>
  );

  return (
    <main className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-2xl mt-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Voeg een evenement toe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputWrapper label="Naam van het event" icon={FileText} required>
          <input name="EventName" required value={formData.EventName} onChange={handleChange} className="w-full p-3 pl-10 border rounded" />
        </InputWrapper>

        <InputWrapper label="Beschrijving" icon={FileText} required>
          <textarea name="Description" required value={formData.Description} onChange={handleChange} className="w-full p-3 pl-10 border rounded" />
        </InputWrapper>

        <InputWrapper label="Type (iftar, lezing...)" icon={FileText} required>
          <input name="EventType" required value={formData.EventType} onChange={handleChange} className="w-full p-3 pl-10 border rounded" />
        </InputWrapper>

        <InputWrapper label="Datum" icon={CalendarDays} required>
          <input type="date" name="Date" required value={formData.Date} onChange={handleChange} className="w-full p-3 pl-10 border rounded" />
        </InputWrapper>

        <div className="flex flex-col sm:flex-row gap-4">
          <InputWrapper label="Starttijd" icon={Clock} required>
            <input type="time" name="StartTime" value={formData.StartTime} onChange={handleChange} required className="w-full p-3 pl-10 border rounded" />
          </InputWrapper>

          <InputWrapper label="Eindtijd" icon={Clock} required>
            <input type="time" name="EndTime" value={formData.EndTime} onChange={handleChange} required className="w-full p-3 pl-10 border rounded" />
          </InputWrapper>
        </div>

        <InputWrapper label="Stad" icon={MapPin} required>
          <input list="city-options" name="City" placeholder="Kies een stad" value={formData.City} onChange={handleChange} required className="w-full p-3 pl-10 border rounded" />
          <datalist id="city-options">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </InputWrapper>

        <InputWrapper label="Locatie (adres of naam zaal)" icon={MapPin} required>
          <input name="Location" value={formData.Location} onChange={handleChange} required className="w-full p-3 pl-10 border rounded" />
        </InputWrapper>

        <InputWrapper label="Doelgroep" icon={Users}>
          <select name="Gender" value={formData.Gender} onChange={handleChange} className="w-full p-3 border rounded">
            <option value="">Kies doelgroep</option>
            <option value="gemengd">Gemengd</option>
            <option value="mannen">Mannen</option>
            <option value="vrouwen">Vrouwen</option>
            <option value="overig">Overig</option>
          </select>
        </InputWrapper>

        <InputWrapper label="Taal" icon={Globe}>
          <select name="Language" value={formData.Language} onChange={handleChange} className="w-full p-3 border rounded">
            <option value="">Kies een taal</option>
            <option value="Nederlands">Nederlands</option>
            <option value="Arabisch">Arabisch</option>
            <option value="Engels">Engels</option>
            <option value="overig">Overig</option>
          </select>
        </InputWrapper>

        <InputWrapper label="Naam organisatie" icon={Building2}>
          <input name="Organisation" value={formData.Organisation} onChange={handleChange} className="w-full p-3 pl-10 border rounded" />
        </InputWrapper>

        <button disabled={submitting} type="submit" className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
          {submitting ? "Versturen..." : "Verstuur"}
        </button>

        {success && <p className="text-green-600 text-center">✅ Evenement succesvol toegevoegd!</p>}
      </form>
    </main>
  );
}
