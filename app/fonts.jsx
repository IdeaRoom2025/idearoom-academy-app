import localFont from "next/font/local";

// TBC Contractica CAPS ფონტები
export const contractica_caps = localFont({
  src: [
    {
      path: "/fonts/tbcContracticaCAPS-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/tbcContracticaCAPS-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/tbcContracticaCAPS-Book.ttf",
      weight: "450",
      style: "normal",
    },
    {
      path: "/fonts/tbcContracticaCAPS-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/tbcContracticaCAPS-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/tbcContracticaCAPS-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-contractica-caps",
  display: "swap",
});

// TBC Contractica (რეგულარული, არა CAPS) ფონტები
export const contractica = localFont({
  src: [
    {
      path: "/fonts/TBCContractica-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/TBCContractica-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/TBCContractica-Book.ttf",
      weight: "450",
      style: "normal",
    },
    {
      path: "/fonts/TBCContractica-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/TBCContractica-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/TBCContractica-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-contractica",
  display: "swap",
});
