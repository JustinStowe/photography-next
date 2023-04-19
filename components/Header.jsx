"use client";
import React from "react";
import Link from "next/link";
import { usePhotoStore } from "../stores/usePhotoStore";
export default function Header() {
  const { user } = usePhotoStore();
  return (
    <div className="p-4 bg-gray-900">
      <nav className="space-x-4 flex justify-between">
        <nav className="space-x-4 flex justify-around">
          {user && (
            <Link href="/home/user/new">
              <button>Upload new Photo</button>
            </Link>
          )}
          {user ? (
            <Link href="/home/user">
              <button>Home</button>
            </Link>
          ) : (
            <Link href="/home/public">
              <button>Home</button>
            </Link>
          )}

          <Link href="/account">
            <button>Account</button>
          </Link>
        </nav>
      </nav>
    </div>
  );
}
