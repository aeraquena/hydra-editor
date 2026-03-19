// Fix Hydra global issue
window.global = window;

import Hydra from "hydra-synth";
import { initEditor } from "./editor.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("dom content loaded");
  // Create canvas
  const canvas = document.createElement("canvas");
  canvas.setAttribute("tabindex", "-1");
  canvas.style.outline = "none";
  canvas.style.pointerEvents = "none";

  document.body.appendChild(canvas);

  const hydra = new Hydra({
    canvas,
    detectAudio: false,
  });

  Object.assign(window, hydra.synth);

  // Expose globally (CRITICAL for osc(), etc.)
  window.hydra = hydra;
  window._hydra = hydra;
  window.hush = () => hydra.hush();

  // Now start editor
  initEditor();
});
