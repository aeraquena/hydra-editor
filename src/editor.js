import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";

import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/theme/material.css";

export function initEditor({ run, hush, onError }) {
  const textarea = document.getElementById("editor");
  const errorDiv = document.getElementById("error");

  const editor = CodeMirror.fromTextArea(textarea, {
    mode: "javascript",
    theme: "material",
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
  });

  editor.setValue(`
osc(10, 0.1, 1.2)
    .rotate(0.1)
    .out()
`);

  function evaluateCode(code) {
    errorDiv.textContent = "";
    run(code);
  }

  function runCode() {
    clearErrors();
    const code = editor.getSelection() || editor.getValue();
    evaluateCode(code);
  }

  function clearErrors() {
    editor.eachLine((line) => {
      editor.removeLineClass(line, "background", "error-line");
    });
    errorDiv.textContent = "";
  }

  function showError({ message, line }) {
    errorDiv.textContent =
      line != null ? `Line ${line + 1}: ${message}` : message;

    if (line != null) {
      editor.addLineClass(line, "background", "error-line");
    }
  }

  editor.setOption("extraKeys", {
    "Cmd-Enter": runCode,
    "Ctrl-Enter": runCode,
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hush();
    }
  });

  editor.focus();

  onError(showError);
}
