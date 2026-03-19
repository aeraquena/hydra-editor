import { initEditor } from "./editor.js";

window.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("hydra-frame");

  function sendToHydra(code) {
    iframe.contentWindow.postMessage(
      {
        type: "eval",
        code,
      },
      "*",
    );
  }

  function hush() {
    iframe.contentWindow.postMessage(
      {
        type: "hush",
      },
      "*",
    );
  }

  let onErrorCallback = null;

  initEditor({
    run: sendToHydra,
    hush,
    onError: (cb) => {
      onErrorCallback = cb;
    },
  });

  // receive errors from iframe
  window.addEventListener("message", (event) => {
    if (event.data.type === "error" && onErrorCallback) {
      onErrorCallback(event.data);
    }
  });
});
