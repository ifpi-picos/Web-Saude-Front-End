import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Web Saúde",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="informações" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="WEB SAÚDE" />
        <meta name="apple-mobile-web-app-title" content="PWA Workshop" />
        <meta name="theme-color" content="#00285f" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body  className={inter.className}>
        {children}
      </body>
    </html>
  );
}
