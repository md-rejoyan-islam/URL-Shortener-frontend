import Header from "@/components/shared/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header from={"auth"} />
      <main className="max-w-[1380px] mx-auto px-4">{children}</main>
    </>
  );
}
