import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border-subtle bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="YourGEOReport"
            width={180}
            height={40}
            className="brightness-[1.03] contrast-[1.05] mix-blend-multiply"
            priority
          />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/insights"
            className="text-sm text-secondary hover:text-dark transition-colors"
          >
            Insights
          </Link>
          <a
            href="/#get-report"
            className="text-sm font-medium text-dark hover:text-accent transition-colors"
          >
            Get Report
          </a>
        </nav>
      </div>
    </header>
  );
}
