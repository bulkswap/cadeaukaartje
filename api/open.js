export default function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "no id" });

  const data = globalThis[`link_${id}`];
  if (!data) return res.status(404).json({ error: "not found" });

  // Eerste klik → timer starten
  if (data.firstOpened === null) {
    data.firstOpened = Date.now();
    globalThis[`link_${id}`] = data;
  }

  // 7 minuten voorbij?
  if (Date.now() > data.firstOpened + 7 * 60 * 1000) {
    return res.status(410).json({ expired: true });
  }

  res.json(data);
}
