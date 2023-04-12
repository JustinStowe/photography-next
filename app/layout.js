import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Justin's Photography",
  description: "Portfolio and business page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
