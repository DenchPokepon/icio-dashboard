export default function ioChainTextFormatter(mainNodeType) {
  if (mainNodeType !== "Final Demand") {
    var formatterFunc = function (params) {
      if (params.data.main) {
        let addCommas = function (x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        let arr = [
          "{name_main|" + params.name + "}",
          "{hr|}",
          "{equation_term|Total Input    $M" +
            addCommas(
              Math.round(params.value[0] - params.value[1] - params.value[2], 1)
            ) +
            "}",
          "{equation_operator|+}",
          "{equation_term|Value Added $M" +
            addCommas(Math.round(params.value[1], 1)) +
            "}",
          "{equation_operator|+}",
          "{equation_term_small|Taxes less subsidies $M" +
            (params.value[2] < 0 ? "(" : "") +
            addCommas(Math.abs(Math.round(params.value[2], 1))) +
            (params.value[2] < 0 ? ")" : "") +
            "}",
          "{equation_operator|=}",
          "{equation_term|Total Output $M" +
            addCommas(Math.round(params.value[0], 1)) +
            "}",
        ];
        return arr.join("\n");
      }
      let arr = [
        "{share_total|" + params.value[1] + "%}",
        "{name|" + params.name + "}",
      ];
      return arr.join("|");
    };
  } else {
    var formatterFunc = function (params) {
      if (params.data.main) {
        let addCommas = function (x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        let arr = [
          "{name_main|" + params.name + "}",
          "{hr|}",
          "{equation_term|Final Demand    $M" +
            addCommas(Math.round(params.value[0] - params.value[1], 1)) +
            "}",
          "{equation_operator|+}",
          "{equation_term_small|Taxes less subsidies $M" +
            (params.value[2] < 0 ? "(" : "") +
            addCommas(Math.abs(Math.round(params.value[1], 1))) +
            (params.value[2] < 0 ? ")" : "") +
            "}",
          "{equation_operator|=}",
          "{equation_term|Total Final Demand $M" +
            addCommas(Math.round(params.value[0], 1)) +
            "}",
        ];
        return arr.join("\n");
      }
      let arr = [
        "{share_total|" + params.value[1] + "%}",
        "{name|" + params.name + "}",
      ];
      return arr.join("|");
    };
  }

  return formatterFunc;
}
