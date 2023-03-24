import React, { useEffect } from "react";
import Prism from "prismjs";
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-markdown");
require("prismjs/components/prism-sql");
require("prismjs/components/prism-plsql");

const SQLArea = ({ text }) => {
  useEffect(() => {
    console.log("SQLArea");
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function
  }, [text]);

  return (
    <div>
      <pre>
        <code className="language-plsql">{text}</code>
      </pre>
    </div>
  );
};

export default SQLArea;
