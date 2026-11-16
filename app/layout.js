import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const fonte = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "instante",
  description: "é como se soubesse tudo o que vejo",
  openGraph: {
    title: "instante",
    description: "é como se soubesse tudo o que vejo",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={fonte.className}>{children}</body>
    </html>
  );
}
