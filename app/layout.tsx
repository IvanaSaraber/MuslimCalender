import "../styles/globals.css";

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
      <body>{children}</body>
    </html>
  );
}
