import React from "react";


export default function Slider( {sector_nClone, changeSectorN, sector_n} ) {
    console.log(sector_n)
    return (
      <div className="filter-tool-sectorN">
      <h4 className="filter-tool-header">Show N Sectors</h4>
      <input
        type="range"
        min="1"
        max="30"
        // value={filterValues.values.sector_n}
        defaultValue={sector_nClone}
        onChange={changeSectorN}
      />
      <output>{sector_nClone}</output>
    </div>
    )
}