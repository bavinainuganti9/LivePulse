import React, { useEffect, useState } from "react";
import cloud from "d3-cloud";
import * as d3 from "d3";

export default function WordCloud() {
  const [words, setWords] = useState([]);
  useEffect(() => {
    const freq = {};
    const es = new EventSource("http://localhost:8000/stream");
    es.onmessage = (e) => {
      const { text } = JSON.parse(e.data);
      text.split(/\W+/).forEach(w=>{
        if(w.length>3) freq[w] = (freq[w]||0)+1;
      });
      const wds = Object.entries(freq).slice(0,100).map(([text, value]) => ({ text, size: 10+value }));
      setWords(wds);
    };
  }, []);
  useEffect(() => {
    if (words.length === 0) return;
    const layout = cloud()
      .size([600, 300])
      .words(words)
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .fontSize(d => d.size)
      .on("end", draw);
    layout.start();

    function draw(ws) {
      d3.select("#word-cloud").selectAll("text").remove();
      const svg = d3.select("#word-cloud")
                    .attr("width",600).attr("height",300)
                    .append("g")
                    .attr("transform","translate(300,150)");
      svg.selectAll("text")
        .data(ws)
        .enter()
        .append("text")
        .style("font-size", d => d.size + "px")
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text);
    }
  }, [words]);

  return <svg id="word-cloud"></svg>;
}
