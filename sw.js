// Service worker do app Financeiro.
//
// Estratégia: o HTML principal (index.html) sempre tenta buscar a versão
// mais NOVA na rede primeiro — só usa a cópia salva em cache se estiver de
// verdade sem internet. Isso evita o app "prender" numa versão antiga depois
// de uma atualização (o problema que tivemos: o app continuava mostrando um
// index.html velho mesmo depois de subir um arquivo novo no GitHub).
//
// Os outros arquivos (ícones, manifest) continuam em cache normal, já que
// raramente mudam e servir do cache deixa o app abrir mais rápido.
const CACHE_NAME = "sumly-v4";
const ARQUIVOS_ESTATICOS = ["./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS_ESTATICOS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(nomes.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Nunca cachear chamadas a serviços externos (Firebase, Google APIs etc.) —
  // sempre precisa ser dado ao vivo.
  if (url.hostname !== self.location.hostname) return;

  const ehPaginaPrincipal =
    event.request.mode === "navigate" ||
    url.pathname.endsWith("/") ||
    url.pathname.endsWith("index.html") ||
    // O config.js muda quando você ajusta chaves/preços — nunca pode ficar preso no cache
    url.pathname.endsWith("config.js");

  if (ehPaginaPrincipal) {
    event.respondWith(
      fetch(event.request)
        .then((resposta) => {
          const copia = resposta.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
          return resposta;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((resposta) => resposta || fetch(event.request))
  );
});
