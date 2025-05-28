// app/layout.tsx
import "../styles/globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Islamic Events App",
  description: "Overzicht van islamitische evenementen in Nederland",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
