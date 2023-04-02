import ioChainRichTextFormatter from "./ioChainRichTextFormatter";

export default function ioChainOptionsCollector(
  visSeries,
  mainNode,
  mainNodeType
) {
  visSeries.right = "30%";
  visSeries.top = "12%";

  return {
    option: {
      series: {
        ...visSeries,
        right: "30%",
        top: "12%",
      },
      title: {
        top: 5,
        left: "center",
        text: mainNode,
        subtext:
          "Sectorial Monetary Flows FROM (inputs) and TO (outputs) in Millions of US Dollar",
        textStyle: {
          fontWeight: 600,
        },
      },
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      label: {
        formatter: ioChainRichTextFormatter(mainNodeType),
        rich: {
          equation_term: {
            color: "#ffffff",
            borderRadius: 5,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            height: 20,
          },
          equation_term_small: {
            color: "#ffffff",
            borderRadius: 5,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            height: 15,
            fontSize: 10,
          },
          equation_operator: {
            padding: [0, 0, 0, 65],
            color: "#000000",
          },
        },
      },
    },
  };
}
