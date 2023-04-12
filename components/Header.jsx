import React from "react";
import Link from "next/link";
export default function Header() {
  return (
    <div className="p-4 bg-gray-900">
      <nav className="space-x-4 flex justify-between">
        <Link href="/new">
          <button className="p-2">upload new Photo</button>
        </Link>
        <Link href="/">
          <button className="p-2">Home</button>
        </Link>
        <Link href="/signIn">
          <button className="p-2">Login</button>
        </Link>
      </nav>
    </div>
  );
}
