export default async function handler(req, res) {
  const r = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  );
  const data = await r.json();
  const price = data.bitcoin.usd;

  let amount = 75;
  let reason = "PAC settimanale";

  if (price < 85000) {
    amount += 25;
    reason += " + extra sotto 85k";
  }
  if (price < 80000) {
    amount += 50;
    reason += " + extra sotto 80k";
  }
  if (price > 92000) {
    return res.status(200).json({
      buy: false,
      amount: 0,
      price,
      reason: "Prezzo alto, acquisto saltato"
    });
  }

  return res.status(200).json({ buy: true, amount, price, reason });
}
