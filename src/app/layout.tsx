import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wave — L'argent qui respire | Expérience Digitale Premium",
  description: "Découvrez l'expérience digitale immersive de Wave. Envoyez de l'argent instantanément avec seulement 0,5% de frais, dans un environnement hautement sécurisé et fluide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased lenis-smooth">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
