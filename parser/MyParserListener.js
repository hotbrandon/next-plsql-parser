import PlSqlParserListener from "@/parser/PlSqlParserListener";
import PlSqlParser from "@/parser/PlSqlParser";

class MyParserListener extends PlSqlParserListener {
  constructor() {
    super();
    this.tables = new Set();
    this.columns = new Map();
    this.output = [];
  }

  getOutput() {
    return this.output;
  }

  enterQuery_block(ctx) {
    this.output.push("enterQuery_block");
  }

  // Exit a parse tree produced by PlSqlParser#query_block.
  exitQuery_block(ctx) {
    this.output.push("exitQuery_block");
  }

  enterTableview_name(ctx) {
    this.tables.add(ctx.getText());
  }

  enterId_expression(ctx) {
    let column = ctx.getText();
    let table = null;
    for (
      let parent = ctx.parentCtx;
      parent != null;
      parent = parent.parentCtx
    ) {
      if (parent instanceof PlSqlParser.Table_ref_auxContext) {
        table = parent.table_alias().getText();
        break;
      }
    }
    if (table != null) {
      if (!this.columns.has(table)) {
        this.columns.set(table, new Set());
      }
      this.columns.get(table).add(column);
    }
  }

  displayTablesAndColumns() {
    console.log("Tables:");
    for (let table of this.tables) {
      console.log(table);
    }
    console.log("Columns:");
    for (let [table, columns] of this.columns) {
      console.log(table + ": " + Array.from(columns).join(", "));
    }
  }
}

export default MyParserListener;
