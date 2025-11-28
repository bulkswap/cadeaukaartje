import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { id } = req.query;
  const data = await kv.get(`link:${id}`);
  if (!data) return res.status(404).json({ error: "not found" });

  // Eerste keer openen? → nu opslaan
  if (!data.firstOpened) {
    data.firstOpened = Date.now();
    await kv.set(`link:${id}`, data);
  }

  // 7 minuten voorbij?
  if (Date.now() > data.firstOpened + 7 * 60 * 1000) {
    return res.status(410).json({ expired: true });
  }

  res.json(data);
}
