import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-4 md:py-0">
      <div className="container max-w-[1380px] mx-auto px-4 flex flex-col items-center justify-between gap-4 py-6  md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} LinkSnip. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/terms"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
