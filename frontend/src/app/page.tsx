import OceanBackground from "@/components/OceanBackground";
import Header from "@/components/Header";
import QueryInput from "@/components/QueryInput";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center">
      {/* Ambient background */}
      <OceanBackground />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center pb-16">
        <Header />

        <div className="w-full mt-6">
          <QueryInput />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-6 mt-auto">
        <p className="text-mist/40 text-xs">
          ⚓ BAHRION Maritime Intelligence — Powered by AI
        </p>
      </footer>
    </main>
  );
}
