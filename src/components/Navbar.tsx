"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <Link href="/" className="cursor-pointer "><span className="text-orange-400 font-bold">Ask</span>Task</Link>
      <div>
        {session ? (
          <>
            <Link href="/admin" className="mr-4 link">Admin</Link>
            <button className="btn btn-neutral" onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={() => router.push("/login")}>Login</button>
          
        )}
      </div>
    </nav>
  );
}
