import localFont from "next/font/local";

// TBC Contractica CAPS ფონტები
export const contractica_caps = localFont({
  src: [
    {
      path: "../public/fonts/tbcContracticaCAPS-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/tbcContracticaCAPS-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/tbcContracticaCAPS-Book.ttf",
      weight: "450",
      style: "normal",
    },
    {
      path: "../public/fonts/tbcContracticaCAPS-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/tbcContracticaCAPS-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/tbcContracticaCAPS-Black.ttf",
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
      path: "../public/fonts/TBCContractica-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/TBCContractica-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TBCContractica-Book.ttf",
      weight: "450",
      style: "normal",
    },
    {
      path: "../public/fonts/TBCContractica-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/TBCContractica-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/TBCContractica-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-contractica",
  display: "swap",
});
