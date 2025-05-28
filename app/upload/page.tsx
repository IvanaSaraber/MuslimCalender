// app/upload/page.tsx — directe keuze op startpagina + betere UX
"use client";

import { useState } from "react";
import { CalendarPlus, Upload, Pencil } from "lucide-react";

export default function UploadPage() {
  const [step, setStep] = useState<"intro" | "manual" | "flyer">("intro");

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
    Organisation: "",
    SourceOfEventInfo: "",
    City: "",
    Image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, Image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Image && !formData.EventName) {
      alert("Upload minimaal een flyer of vul eventgegevens in.");
      return;
    }
    console.log("Verzonden:", formData);
    alert("Formulier verzonden (dummy)");
  };

  const steden = ["Amsterdam", "Rotterdam", "Utrecht", "Den Haag", "Eindhoven", "Groningen", "Leiden", "Tilburg"];

  return (
    <main className="p-4 max-w-2xl mx-auto">
      {step === "intro" && (
        <div className="text-center space-y-6">
          <CalendarPlus size={48} className="mx-auto text-green-600" />
          <h1 className="text-2xl font-bold">Evenement toevoegen aan de agenda</h1>
          <p className="text-gray-600 mb-4">Je kunt handmatig gegevens invullen of een flyer uploaden. Kies hieronder:</p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setStep("manual")}
              className="flex items-center gap-2 justify-center border p-3 rounded shadow hover:bg-gray-50"
            >
              <Pencil size={20} /> Handmatig invoeren
            </button>
            <button
              onClick={() => setStep("flyer")}
              className="flex items-center gap-2 justify-center border p-3 rounded shadow hover:bg-gray-50"
            >
              <Upload size={20} /> Alleen flyer uploaden
            </button>
          </div>
        </div>
      )}

      {step === "manual" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">Handmatige invoer</h2>
          <input name="EventName" placeholder="Eventnaam" onChange={handleChange} className="input" required />
          <input name="Speaker" placeholder="Spreker" onChange={handleChange} className="input" />
          <select name="Gender" onChange={handleChange} className="input">
            <option value="">Doelgroep</option>
            <option value="mannen">Mannen</option>
            <option value="vrouwen">Vrouwen</option>
            <option value="gemengd">Gemengd</option>
          </select>
          <textarea name="Description" placeholder="Beschrijving van het event" onChange={handleChange} className="input" />
          <input name="EventType" placeholder="Type (lezing, iftar...)" onChange={handleChange} className="input" />
          <input type="date" name="Date" onChange={handleChange} className="input" required />
          <input type="time" name="StartTime" onChange={handleChange} className="input" />
          <input type="time" name="EndTime" onChange={handleChange} className="input" />
          <select name="Language" onChange={handleChange} className="input">
            <option value="">Taal</option>
            <option value="Nederlands">Nederlands</option>
            <option value="Arabisch">Arabisch</option>
            <option value="Engels">Engels</option>
            <option value="overig">Overig</option>
          </select>
          <input name="Location" placeholder="Adres / Gebouw" onChange={handleChange} className="input" />
          <input name="Organisation" placeholder="Naam organisatie" onChange={handleChange} className="input" />
          <input name="SourceOfEventInfo" placeholder="Link naar bron (optioneel)" onChange={handleChange} className="input" />
          <input
            list="steden"
            name="City"
            placeholder="Stad"
            onChange={handleChange}
            className="input"
          />
          <datalist id="steden">
            {steden.map((stad) => (
              <option key={stad} value={stad} />
            ))}
          </datalist>
          <div className="pt-4">
            <label className="block mb-1 font-medium">Upload flyer (optioneel)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="input" />
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Verzenden</button>
        </form>
      )}

      {step === "flyer" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-2">Alleen flyer uploaden</h2>
          <input type="file" accept="image/*" onChange={handleFileChange} className="input" required />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Verzenden</button>
        </form>
      )}
    </main>
  );
}

// .input { @apply w-full px-4 py-2 border rounded shadow-sm; }
