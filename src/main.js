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

  initEditor({
    run: sendToHydra,
    hush,
  });

  // receive errors from iframe
  window.addEventListener("message", (event) => {
    if (event.data.type === "error") {
      console.error(event.data.message);
    }
  });
});
