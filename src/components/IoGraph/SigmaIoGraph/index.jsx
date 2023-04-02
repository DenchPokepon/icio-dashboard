import React, { useEffect, useState }  from "react"
import Graph from "graphology";
import { SigmaContainer, ControlsContainer, ZoomControl, FullScreenControl, SearchControl } from "@react-sigma/core";


export default function({ visOption, dataIsLoading, dataIsError, dataError }) {
    
  const [visOptionProp, setVisOptionProp] = useState({})

  useEffect(() => {
    if (!dataIsLoading && !dataError && visOption !== undefined) {
      setVisOptionProp(visOption)
    } else {
      setVisOptionProp((prev) => (prev))
    }
  }, [visOption, dataIsLoading, dataError])

  
  const graph = Graph.from(visOptionProp);



  graph.nodes().forEach((node) => {
    graph.setNodeAttribute(node, "size", graph.getNodeAttribute(node, "size") / 10);
    graph.setNodeAttribute(node, "label", `${graph.getNodeAttribute(node, "country")}-${graph.getNodeAttribute(node, "sector")}`);
  });

  graph.edges().forEach((edge) => {
    graph.setEdgeAttribute(edge, "size", graph.getEdgeAttribute(edge, "size") / 10)
  })


    return (
            <SigmaContainer 
                  className="SigmaIoGraph-vis"
                  graph={graph}
                  settings={{
                    // nodeProgramClasses: { image: getNodeProgramImage() },
                    // defaultNodeType: "image",
                    defaultEdgeType: "arrow",
                    // labelDensity: 0.07,
                    // labelGridCellSize: 60,
                    // labelRenderedSizeThreshold: 15,
                    // labelFont: "Lato, sans-serif",
                    zIndex: true,
                  }}
                />
    )
}