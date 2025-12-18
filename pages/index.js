import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/pac-check")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ error: true }));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "system-ui", maxWidth: 520, margin: "0 auto" }}>
      <h1>₿ BTC PAC Assistant</h1>

      {!data && <p>Caricamento...</p>}

      {data?.error && <p>Errore nel caricamento dati.</p>}

      {data && !data.error && (
        <>
          <p><strong>Prezzo BTC:</strong> ${data.price}</p>
          <h2 style={{ color: data.buy ? "green" : "red" }}>
            {data.buy ? `Compra ${data.amount} €` : "Oggi NON comprare"}
          </h2>
          <p>{data.reason}</p>
        </>
      )}
    </div>
  );
}
