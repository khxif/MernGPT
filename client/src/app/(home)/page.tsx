import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="h-full flex-1 py-6 mt-5 space-y-5">
        <h1 className="text-3xl text-center font-bold">MernGPT</h1>
        <Link href='/chat'>chat</Link>
      </div>
    </div>
  );
}
