import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import { Button } from "primereact/button";

const data = [
  {
    key: "0",
    label: "Documents",
    data: "Documents Folder",
    icon: "pi pi-fw pi-inbox",
    children: [
      {
        key: "0-0",
        label: "Work",
        data: "Work Folder",
        icon: "pi pi-fw pi-cog",
        children: [
          {
            key: "0-0-0",
            label: "Expenses.doc",
            icon: "pi pi-fw pi-file",
            data: "Expenses Document",
          },
          {
            key: "0-0-1",
            label: "Resume.doc",
            icon: "pi pi-fw pi-file",
            data: "Resume Document",
          },
        ],
      },
      {
        key: "0-1",
        label: "Home",
        data: "Home Folder",
        icon: "pi pi-fw pi-home",
        children: [
          {
            key: "0-1-0",
            label: "Invoices.txt",
            icon: "pi pi-fw pi-file",
            data: "Invoices for this month",
          },
        ],
      },
    ],
  },
];

export default function ControlledDemo() {
  const [nodes, setNodes] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState({ 0: true, "0-0": true });

  const expandAll = () => {
    let _expandedKeys = {};

    for (let node of nodes) {
      expandNode(node, _expandedKeys);
    }

    setExpandedKeys(_expandedKeys);
  };

  const collapseAll = () => {
    setExpandedKeys({});
  };

  const expandNode = (node, _expandedKeys) => {
    if (node.children && node.children.length) {
      _expandedKeys[node.key] = true;

      for (let child of node.children) {
        expandNode(child, _expandedKeys);
      }
    }
  };

  useEffect(() => {
    setNodes(data);
  }, []);

  return (
    <div className="card flex flex-column align-items-center">
      {/* <div className="flex flex-wrap gap-2 mb-4">
        <Button
          type="button"
          icon="pi pi-plus"
          label="Expand All"
          onClick={expandAll}
        />
        <Button
          type="button"
          icon="pi pi-minus"
          label="Collapse All"
          onClick={collapseAll}
        />
      </div> */}

      <Tree
        value={nodes}
        expandedKeys={expandedKeys}
        onToggle={(e) => setExpandedKeys(e.value)}
        className="w-full md:w-30rem"
      />
    </div>
  );
}
