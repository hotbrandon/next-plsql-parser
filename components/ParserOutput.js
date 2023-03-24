import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markdown";

const ParserOutput = ({ markdown }) => {
  useEffect(() => {
    console.log("ParserOutput");
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function
  }, [markdown]);

  return (
    <div>
      {/* <pre>
        <code className="language-markdown"> */}
      {markdown.map((text, index) => (
        <ReactMarkdown key={index}>{text}</ReactMarkdown>
      ))}
      {/* </code>
      </pre> */}
    </div>
  );
};

export default ParserOutput;
