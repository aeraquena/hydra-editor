import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";

import "codemirror/mode/javascript/javascript.js";

// addons
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/edit/closebrackets.js";

// optional theme
import "codemirror/theme/material.css";

export function initEditor() {
  const textarea = document.getElementById("editor");
  const errorDiv = document.getElementById("error");

  const editor = CodeMirror.fromTextArea(textarea, {
    mode: "javascript",
    theme: "material",
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
  });

  editor.focus();

  editor.getWrapperElement().tabIndex = 0;

  editor.setValue(`
// Cmd+Enter to run
osc(10, 0.1, 1.2)
  .rotate(0.1)
  .out()
`);

  function clearErrors() {
    errorDiv.textContent = "";
    editor.eachLine((line) => {
      editor.removeLineClass(line, "background", "error-line");
    });
  }

  function evaluateCode(code) {
    clearErrors();

    try {
      new Function(code)();
    } catch (e) {
      console.error(e);

      let line = null;

      const match = e.stack?.match(/:(\\d+):(\\d+)/);
      if (match) {
        line = Number(match[1]) - 1;
      }

      if (line !== null) {
        editor.addLineClass(line, "background", "error-line");
        errorDiv.textContent = `Line ${line + 1}: ${e.message}`;
      } else {
        errorDiv.textContent = e.message;
      }
    }
  }

  function run() {
    const code = editor.getSelection() || editor.getValue();
    evaluateCode(code);
  }

  // panic key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      window.hush();
    }
  });

  editor.setOption("extraKeys", {
    "Cmd-Enter": () => {
      console.log("RUN");
      run();
    },
    "Ctrl-Enter": () => {
      console.log("RUN");
      run();
    },
  });

  document.addEventListener("keydown", (e) => {
    console.log("KEY:", e.key);
  });

  document.addEventListener("mousedown", (e) => {
    const wrapper = editor.getWrapperElement();

    if (!wrapper.contains(e.target)) {
      // click outside editor → bring focus back
      editor.focus();
    }
  });

  setInterval(() => {
    console.log(document.activeElement);
  }, 1000);
}
