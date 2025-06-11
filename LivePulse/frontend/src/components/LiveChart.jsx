import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function LiveChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const es = new EventSource("http://localhost:8000/stream");
    es.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setData((d) => [...d, { time: new Date().toLocaleTimeString(), score: msg.score }].slice(-50));
    };
  }, []);
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="time" />
      <YAxis domain={[-1,1]} />
      <Tooltip />
      <CartesianGrid strokeDasharray="3 3" />
      <Line type="monotone" stroke="#8884d8" dataKey="score" dot={false} />
    </LineChart>
  );
}
