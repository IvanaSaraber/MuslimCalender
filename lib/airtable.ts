import Airtable from "airtable";

const apiKey = process.env.AIRTABLE_API_KEY!;
const baseId = process.env.AIRTABLE_BASE_ID!;
const organisationTable = process.env.ORGANISATION_TABLE || "OrganisationData";
const eventTable = process.env.EVENT_TABLE || "EventRecords";

const base = new Airtable({ apiKey }).base(baseId);

export const organisationTableRef = base(organisationTable);
export const eventTableRef = base(eventTable);

// ✅ Toegevoegd: functie om een event aan te maken
export const addEventToAirtable = async (fields: any) => {
  return await eventTableRef.create([{ fields }]);
};
