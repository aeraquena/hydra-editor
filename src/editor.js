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

  let bracketMarkers = [];

  editor.on("change", () => {
    checkBrackets(editor);
  });

  editor.setValue(``);

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

  function checkBrackets(cm) {
    // clear previous highlights
    bracketMarkers.forEach((m) => m.clear());
    bracketMarkers = [];

    const code = cm.getValue();
    const stack = [];

    const pairs = {
      "(": ")",
      "[": "]",
      "{": "}",
    };

    const opens = Object.keys(pairs);
    const closes = Object.values(pairs);

    for (let i = 0; i < code.length; i++) {
      const char = code[i];

      if (opens.includes(char)) {
        stack.push({ char, index: i });
      } else if (closes.includes(char)) {
        if (stack.length === 0) {
          markError(cm, i);
          continue;
        }

        const last = stack.pop();
        if (pairs[last.char] !== char) {
          markError(cm, i);
          markError(cm, last.index);
        }
      }
    }

    // anything left unmatched
    stack.forEach(({ index }) => {
      markError(cm, index);
    });
  }

  function markError(cm, index) {
    const pos = cm.posFromIndex(index);

    const marker = cm.markText(
      { line: pos.line, ch: pos.ch },
      { line: pos.line, ch: pos.ch + 1 },
      { className: "cm-bracket-error" },
    );

    bracketMarkers.push(marker);
  }

  editor.setOption("extraKeys", {
    "Cmd-Enter": runCode,
    "Ctrl-Enter": runCode,
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hush();
    } else if (e.key === "Alt") {
      // press alt key once to enable MIDI
      document
        .getElementById("hydra-frame")
        .contentWindow.postMessage({ type: "init-midi" }, "*");
    }
  });

  editor.focus();

  onError(showError);
}
