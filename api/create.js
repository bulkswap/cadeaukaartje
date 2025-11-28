export default function handler(req, res) {
  const { price, article, receiver, via, checkout } = req.query;

  if (!price || !checkout) {
    return res.status(400).json({ error: "missing" });
  }

  const slug = Math.random().toString(36).substring(2, 15); // 13 chars

  const data = {
    price: parseFloat(price),
    article: article || "Cadeaukaart",
    receiver: receiver || "Onbekend",
    via: via || "Betaalverzoek.nu",
    checkout,
    firstOpened: null
  };

  globalThis[`link_${slug}`] = data;   // in-memory (werkt meteen)

  res.json({
    url: `https://betaalverzoek.nu/link/${slug}`
  });
}
