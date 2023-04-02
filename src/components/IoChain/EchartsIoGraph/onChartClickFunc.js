import arrayContains from "/src/utils/arrayContains";

export default function onChartClickFunc(params, echart, setFilterValues) {
  if (params.dataType === "node") {
    if (params.data.main) return;
    var nodeName = params.data.name;
  } else if (params.dataType === "edge") {
    let dataIds =
      echart._chartsMap["_ec_\x00series\x000\x000_series.sankey"]._data._idList;
    let mainNode = dataIds[dataIds.length - 1];
    var nodeName =
      mainNode === params.data.source ? params.data.target : params.data.source;
  }
  if (arrayContains(nodeName, ["Other outputs", "Other inputs"])) return;

  let splitCountrySector = nodeName.split(": ");
  setFilterValues((prevFilter) => ({
    ...prevFilter,
    updatedBy: "other",
    values: {
      ...prevFilter.values,
      country: splitCountrySector[0],
      sector: splitCountrySector[1].slice(0, -1),
    },
  }));
  return;
}
