import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "@/auth";

const Navbar = async () => {
  return (
    <nav className="flex justify-between items-center py-2 px-8 bg-[#141414] text-white">
      <Link href="/" className="text-xl font-bold">
        My World
      </Link>

      <ul className="hidden md:flex space-x-4 list-none items-center">
        <>
          <li>
            <Link href="/login" className="hover:text-gray-400">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:text-gray-400">
              Register
            </Link>
          </li>
        </>
        <>
          <li>
            <Link href="/dashboard" className="hover:text-gray-400">
              Dashboard
            </Link>
          </li>

          <form
            action={async (formData) => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit" variant={"ghost"}>
              Logout
            </Button>
          </form>
        </>
      </ul>
    </nav>
  );
};

export default Navbar;
