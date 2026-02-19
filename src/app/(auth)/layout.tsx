import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="w-10 h-10 text-primary" />
              <h1 className="text-3xl font-extrabold tracking-tight">UniEvent</h1>
            </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
