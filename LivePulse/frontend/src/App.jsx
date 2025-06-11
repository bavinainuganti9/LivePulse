import React from "react";
import LiveChart from "./components/LiveChart";
import WordCloud from "./components/WordCloud";

export default function App() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">LivePulse – Real-Time Sentiment Dashboard</h1>
      <LiveChart />
      <WordCloud />
    </div>
  );
}
