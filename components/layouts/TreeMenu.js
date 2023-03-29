import React from "react";
import Link from "next/link";

const TreeMenu = () => {
  return (
    <div>
      <p>Menu</p>
      <ul>
        <li>
          <Link href="/parser">procedure parser</Link>
        </li>
      </ul>
    </div>
  );
};

export default TreeMenu;
