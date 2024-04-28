import React from "react";
import { promises as fs } from "fs";
import path from "path";

const Wiki = async () => {
  const filePath = path.join(process.cwd(), "public", "wiki", `wiki.json`);
  const content = await fs.readFile(filePath, "utf8");
  const jsonData = JSON.parse(content);

  return (
    <div>
      {jsonData.map((entry: any) => (
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
          key={entry.title}
        >
          <h2 className="mb-3 text-2xl font-semibold">{entry.title}</h2>
          <p>{entry.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Wiki;
