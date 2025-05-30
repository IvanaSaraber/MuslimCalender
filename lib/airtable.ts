import { Api } from "pyairtable";

const apiKey = process.env.AIRTABLE_API_KEY!;
const baseId = process.env.AIRTABLE_BASE_ID!;
const tableName = process.env.EVENT_TABLE || "EventRecords";

const api = new Api(apiKey);
const eventTable = api.base(baseId).table(tableName);

export default eventTable;
