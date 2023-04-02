import loadingAnimation from "./loadingAnimation";
import onChartClickFunc from "./onChartClickFunc";
import ioChainOptionsCollector from "./ioChainOptionsCollector";
import { filterStackUpdate } from "./filterStack";
import {
  nextFilter,
  previousFilter,
  nextPreviousButtonsColorsUpdate,
} from "./nextPreviousFilter";

import ReactEChartsCore from "echarts-for-react/lib/core";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import charts, all with Chart suffix
import { SankeyChart } from "echarts/charts";
import { TooltipComponent, TitleComponent } from "echarts/components";
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useState } from "react";
import { useCallback } from "react";

// Register the required components
echarts.use([TitleComponent, TooltipComponent, SankeyChart, CanvasRenderer]);

export default function ({
  visData,
  filter,
  setFilter,
  dictionaries,
}) {
  const [filterStack, setFilterStack] = useState({stack: [filter], currentFilter: 0});
  const [visDataProp, setVisDataProp] = useState({ option: {} });

  useEffect(() => {
    filterStackUpdate(filterStack, filter, setFilterStack);
  }, [filter]);

  useEffect(() => {
    nextPreviousButtonsColorsUpdate(filterStack, filter);
  }, [filterStack]);

  useEffect(() => {
    if (
      !visData.isLoading &&
      !visData.isError &&
      !dictionaries.sector.isLoading
    ) {
      let mainNode = visData.data.data.filter((x) => x.main)[0].name;
      let mainNodeType =
        dictionaries.sector.data.level_1_eng[
          dictionaries.sector.data.name_eng.indexOf(mainNode.split(": ")[1])
        ];
      setVisDataProp(
        ioChainOptionsCollector(visData.data, mainNode, mainNodeType)
      );
    } else {
      setVisDataProp((prevVisDataProp) => prevVisDataProp);
    }
  }, [
    visData.data,
    visData.isLoading,
    visData.isError,
    dictionaries.sector.isLoading,
  ]);

  const onChartClick = useCallback(
    (params, echart) => onChartClickFunc(params, echart, setFilter),
    []
  );

  const onEvents = {
    click: onChartClick,
  };

  return (
    <div>
      <div className="next-previous-filter">
        <div
          className="previous-filter button-filter"
          onClick={() => previousFilter(filterStack, setFilterStack, setFilter)}
        >
          &laquo;
        </div>
        <div
          className="next-filter button-filter"
          onClick={() => nextFilter(filterStack, setFilterStack, setFilter)}
        >
          &raquo;
        </div>
      </div>
      <div className="EchartsIoGraph-vis">
        <ReactEChartsCore
          echarts={echarts}
          {...visDataProp}
          notMerge={false}
          lazyUpdate={true}
          theme={"theme_name"}
          style={{ height: "100%", width: "100%" }}
          loadingOption={loadingAnimation(visData.isError)}
          showLoading={visData.isLoading || visData.isError}
          onEvents={onEvents}
        />
      </div>
    </div>
  );
}
