export function registerServiceWorker() {
  window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./src/sw.js", { scope: "/" })
        .then(function () {
          console.log("Service Worker Registrado");
        })
        .catch((error) => {
          console.warn("Erro ao registrar o Service Worker");
          console.warn(error);
        });
      navigator.serviceWorker.ready.then(function (registration) {
        console.log("Service Worker Pronto");
        registration.update();
      });
    }
  });
}
