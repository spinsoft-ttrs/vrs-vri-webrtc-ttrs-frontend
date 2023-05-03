const convert = require("xml-js");

const PreviewText = (msgRealtime, message) => {
  var rs = convert.xml2json(message, { compact: true, spaces: 4 });
  rs = JSON.parse(rs);
  if (rs.rtt.t) {
    if (rs.rtt._attributes.event === "new") {
      return rs.rtt.t._text;
    } else if (rs.rtt._attributes.event === "reset") {
      if (rs.rtt.e) {
        var txt = rs.rtt.t[0]._text;
        var tmp;
        for (let index = 0; index < rs.rtt.e._attributes.n; index++) {
          tmp = removeCharacter(txt, rs.rtt.e._attributes.p - 1);
        }
        return tmp;
      } else {
        if (rs.rtt.t._text) {
          return rs.rtt.t._text;
        } else if (rs.rtt.t[0]._text) {
          if (rs.rtt.t[2]._text === undefined) {
            rs.rtt.t[2]._text = " ";
          }
          return rs.rtt.t[0]._text + "" + rs.rtt.t[2]._text;
        } else {
          return "";
        }
      }
    } else {
      if (rs.rtt.t._attributes) {
        var add = addCharater(msgRealtime, rs.rtt.t._text, rs.rtt.t._attributes.p);
        return add;
      } else {
        if (rs.rtt.t._text === undefined) {
          rs.rtt.t._text = " ";
        }
        if (msgRealtime === undefined) {
          msgRealtime = "";
        }
        var result = msgRealtime + "" + rs.rtt.t._text;
        if (result.trim() === "") {
          // result
        }
        return result;
      }
    }
  } else if (rs.rtt.e) {
    tmp = msgRealtime;
    for (let index = 0; index < rs.rtt.e._attributes.n; index++) {
      tmp = removeCharacter(msgRealtime, rs.rtt.e._attributes.p - 1);
    }
    return tmp;
  }
};
const addCharater = (str, stradd, char_pos) => {
  var output = [str.slice(0, char_pos), stradd, str.slice(char_pos)].join("");
  return output;
};
const removeCharacter = (str, char_pos) => {
  var part1 = str.substring(0, char_pos);
  var part2 = str.substring(char_pos + 1, str.length);
  return part1 + part2;
};

export default PreviewText;
