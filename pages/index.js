import Head from "next/head";
import styles from "../styles/Home.module.css";
import antlr4 from "antlr4";
import { useRef, useState } from "react";
import PlSqlParser from "@/parser/PlSqlParser";
import PlSqlLexer from "@/parser/PlSqlLexer";
import MyParserListener from "@/parser/MyParserListener";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Home() {
  const refSqlArea = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [parserOutput, setParserOutput] = useState();

  const handleClick = async () => {
    setIsLoading(true);
    await parseSQL();
    setIsLoading(false);
  };

  const parseSQL = async () => {
    const stream = new antlr4.InputStream(refSqlArea.current.value);
    const lexer = new PlSqlLexer(stream);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new PlSqlParser(tokens);
    parser.buildParserTrees = true;

    const listener = new MyParserListener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, parser.query_block());

    listener.displayTablesAndColumns();
    setParserOutput(listener.getOutput());
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className="flex h-screen gap-x-3">
        <div className="flex-1 flex flex-col">
          <textarea
            ref={refSqlArea}
            className="h-full resize-none border-2 p-2"
            placeholder="paste your PL/SQL script"
          ></textarea>
          <div className="flex gap-x-3">
            <button
              className="py-2 px-4 bg-blue-500 text-white grow"
              onClick={handleClick}
            >
              Submit
            </button>
            <button
              className="py-2 px-4 bg-blue-500 text-white grow"
              onClick={() => (refSqlArea.current.value = "")}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          {parserOutput && parserOutput.map((line, i) => <p key={i}>{line}</p>)}
        </div>
      </div>
    </>
  );
}
