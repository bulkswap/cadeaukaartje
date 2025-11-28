import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "No id provided" });
  }

  const data = await kv.get(`link:${id}`);

  if (!data) {
    return res.status(404).json({ error: "Link not found" });
  }

  // Eerste keer openen? → nu opslaan (start timer)
  if (data.firstOpened === null) {
    data.firstOpened = Date.now();
    await kv.set(`link:${id}`, data);
  }

  // 7 minuten na eerste opening?
  if (Date.now() > data.firstOpened + 7 * 60 * 1000) {
    return res.status(410).json({ expired: true, message: "Link expired after 7 minutes from first open" });
  }

  res.json(data);
}
