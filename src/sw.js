const version = 1;
const CACHE_NAME = `meu_cache_${version}`;
const cacheList = ["../src/index.html", "../src/index.css", "../src/main.jsx"];

const atualizeCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const cachePrimeiro = async ({ request, fallbackUrl }) => {
  const respostaDoCache = await caches.match(request);
  if (respostaDoCache) {
    return respostaDoCache;
  }

  try {
    const respostaDaRede = await fetch(request);
    atualizeCache(request, respostaDaRede.clone());
    return respostaDaRede;
  } catch (error) {
    const respostaFallback = await caches.match(fallbackUrl);
    if (respostaFallback) {
      return respostaFallback;
    }

    return new Response("Erro na rede", {
      status: 408,
      headers: { "Content-Type": "application/json" },
    });
  }
};

const deletaCache = async (key) => {
  await caches.delete(key);
};

const deletaCachesAntigos = async () => {
  const cacheList = [CACHE_NAME];
  const keyList = await caches.keys();
  const cachesParaDeletar = keyList.filter((key) => !cacheList.includes(key));
  await Promise.all(cachesParaDeletar.map(deletaCache));
};

self.addEventListener("install", (e) => {
  console.log("Instalando o Service Worker");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(cacheList).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Ativando o Service Worker");
  event.waitUntil(self.clients.claim());
  event.waitUntil(deletaCachesAntigos);
});

self.addEventListener("fetch", (event) => {
  console.log(`Baixando ${event.request.url}`);
  event.respondWith(
    cachePrimeiro({
      request: event.request,
      fallbackUrl: "../src/index.html",
    })
  );
});
