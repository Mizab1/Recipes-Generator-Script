var __defProp = Object.defineProperty;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};

// src/display.ts
var exports_display = {};
__export(exports_display, {
  displayMessage: () => displayMessage
});
import { MCFunction, tellraw } from "sandstone";
var displayMessage = () => MCFunction("template:display_message", () => {
  tellraw("@a", [
    `
========= Congratulations! =========

`,
    { text: " Sandstone template library", color: "gold", bold: true },
    " is ",
    { text: `successfully installed.

`, color: "green" },
    "==============",
    { text: "\uD83C\uDFF9", color: "#D2691E" },
    { text: "⚔", color: "#45ACA5" },
    { text: "⛏", color: "#FFD700" },
    "=============="
  ]);
}, {
  runOnLoad: true
});

// src/index.ts
var {
  displayMessage: displayMessage2
} = exports_display;
export {
  displayMessage2 as displayMessage
};
