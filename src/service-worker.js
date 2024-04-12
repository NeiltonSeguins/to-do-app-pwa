import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { Route, registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

//Handle images:
const imageRoute = new Route(
  ({ request }) => {
    return request.destination === "image";
  },
  new StaleWhileRevalidate({
    cacheName: "images",
  })
);

// Handle scripts:
const scriptsRoute = new Route(
  ({ request }) => {
    return request.destination === "script";
  },
  new StaleWhileRevalidate({
    cacheName: "scripts",
  })
);

// Handle styles:
const stylesRoute = new Route(
  ({ request }) => {
    return request.destination === "style";
  },
  new CacheFirst({
    cacheName: "styles",
  })
);

// Handle google fonts
const googleFontsRoute = new Route(
  (url) => url.origin === "https://fonts.googleapis.com",
  new StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheet",
  })
);

// Handle google fonts
const googleFontsSubRoute = new Route(
  (url) => url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, //faz o cache com expiração em 1 ano
        maxEntries: 30,
      }),
    ],
  })
);

// Register routes
registerRoute(imageRoute);
registerRoute(scriptsRoute);
registerRoute(stylesRoute);
registerRoute(googleFontsRoute);
registerRoute(googleFontsSubRoute);
