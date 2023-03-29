import Head from "next/head";
import styles from "../styles/Home.module.css";
import antlr4 from "antlr4";
import { useRef, useState, useEffect } from "react";
import PlSqlParser from "@/parser/PlSqlParser";
import PlSqlLexer from "@/parser/PlSqlLexer";
import MyParserListener from "@/parser/MyParserListener";
import LoadingOverlay from "@/components/LoadingOverlay";

import SQLArea from "@/components/SQLArea";
import ParserOutput from "components/ParserOutput";

export default function Home() {
  const refSqlArea = useRef("");
  const [sqlText, setSqlText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [parserOutput, setParserOutput] = useState();

  const handleClick = async () => {
    // setIsLoading(true);
    await parseSQL();
    // setIsLoading(false);
  };

  const parseSQL = async () => {
    setParserOutput([]);
    console.log(refSqlArea.current.value);
    var sqlCode = document.getElementById("sqlCode").value;
    const stream = new antlr4.InputStream(sqlCode);
    const lexer = new PlSqlLexer(stream);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new PlSqlParser(tokens);
    parser.buildParserTrees = true;

    const listener = new MyParserListener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, parser.sql_script());

    listener.displayTablesAndColumns();
    setParserOutput(listener.getOutput());
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className="flex gap-x-3 h-full">
        <div className="flex-1 flex flex-col">
          <textarea
            ref={refSqlArea}
            id="sqlCode"
            className="h-full resize-none border-2 p-2"
            placeholder="paste your PL/SQL script"
          ></textarea>
          <SQLArea text={sqlText} />
          <div className="flex gap-x-3">
            <button
              className="py-2 px-4 bg-blue-500 text-white grow"
              onClick={handleClick}
            >
              Submit
            </button>
            <button
              className="py-2 px-4 bg-blue-500 text-white grow"
              onClick={() => {
                refSqlArea.current.value = "";
                setSqlText("");
              }}
            >
              Clear
            </button>
            <button
              className="py-2 px-4 bg-blue-500 text-white grow"
              onClick={() => setSqlText(refSqlArea.current.value)}
            >
              Highlight
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-auto">
          {parserOutput && <ParserOutput markdown={parserOutput} />}
        </div>
      </div>
    </>
  );
}
