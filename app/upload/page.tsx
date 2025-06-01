"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const cities = [
  "Amsterdam", "Rotterdam", "Utrecht", "Den Haag", "Eindhoven",
  "Tilburg", "Groningen", "Almere", "Breda", "Nijmegen", "Arnhem",
  "Leiden", "Haarlem", "Zoetermeer", "Zwolle", "Maastricht", "Overig"
];

export default function ManualUploadPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    EventName: "",
    Speaker: "",
    Gender: "",
    Description: "",
    EventType: "",
    Date: "",
    StartTime: "",
    EndTime: "",
    Language: "",
    Location: "",
    City: "",
    Organisation: "",
    SourceOfEventInfo: "",
    Image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/submit-event", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/");
      } else {
        alert("Fout bij verzenden");
      }
    } catch (error) {
      console.error("Upload mislukt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#fefaf5] min-h-screen px-4 py-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-[#422c1b]">Event handmatig toevoegen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="EventName" placeholder="Naam van het event" onChange={handleChange} required className="input" />
        <input name="Speaker" placeholder="Spreker(s)" onChange={handleChange} className="input" />
        <input name="Gender" placeholder="Doelgroep (bijv. vrouwen)" onChange={handleChange} className="input" />
        <textarea name="Description" placeholder="Beschrijving" onChange={handleChange} className="input" />

        <input name="EventType" placeholder="Soort event (bijv. lezing, iftar)" onChange={handleChange} className="input" />
        
        <input type="date" name="Date" onChange={handleChange} required className="input" />
        <input type="time" name="StartTime" onChange={handleChange} placeholder="Begintijd" required className="input" />
        <input type="time" name="EndTime" onChange={handleChange} placeholder="Eindtijd" required className="input" />

        <select name="Language" onChange={handleChange} required className="input">
          <option value="">Kies een taal</option>
          <option>Nederlands</option>
          <option>Engels</option>
          <option>Arabisch</option>
          <option>Turks</option>
          <option>Overig</option>
        </select>

        <input name="Location" placeholder="Adres of locatie" onChange={handleChange} required className="input" />

        <input
          list="cities"
          name="City"
          placeholder="Stad"
          onChange={handleChange}
          required
          className="input"
        />
        <datalist id="cities">
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>

        <input name="Organisation" placeholder="Organisatie" onChange={handleChange} className="input" />
        <input name="SourceOfEventInfo" placeholder="Bron van event" onChange={handleChange} className="input" />
        <input name="Image" placeholder="Afbeeldings-URL (optioneel)" onChange={handleChange} className="input" />

        <button type="submit" disabled={isSubmitting} className="bg-[#c9b6a0] text-white py-2 px-4 rounded-xl hover:bg-[#b9a28e] transition">
          {isSubmitting ? "Versturen..." : "Event toevoegen"}
        </button>
      </form>
    </main>
  );
}
