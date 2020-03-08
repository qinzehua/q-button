/* eslint-disable */
import Button from "./src/button";
import ButtonGroup from "./src/button-group";
import Icon from "./src/icon";

export { Button, ButtonGroup, Icon };

var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute(
  "src",
  "https://at.alicdn.com/t/font_860960_ez9q0gj9nvh.js"
);
var heads = document.getElementsByTagName("head");
if (heads.length) heads[0].appendChild(script);
else document.documentElement.appendChild(script);
