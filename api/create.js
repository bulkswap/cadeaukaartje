import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { price, article, receiver, via, checkout } = req.query;

  if (!price || !checkout) {
    return res.status(400).json({ error: "Missing price or checkout" });
  }

  // 13-karakter slug
  const slug = Math.random().toString(36).substring(2, 15);

  const data = {
    price: parseFloat(price),
    article: article || "Cadeaukaart",
    receiver: receiver || "Onbekend",
    via: via || "Betaalverzoek.nu",
    checkout: checkout,
    firstOpened: null, // Voor expiry
  };

  await kv.set(`link:${slug}`, data);

  res.json({ 
    url: `https://betaalverzoek.nu/link/${slug}`,
    slug: slug
  });
}
