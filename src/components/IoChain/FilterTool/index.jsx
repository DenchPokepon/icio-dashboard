import React, { useState, useMemo } from "react";
import Select from "react-select";
import whichTrue from "/src/utils/whichTrue";
import intersection from "/src/utils/intersection";
import unique from "/src/utils/unique";
import findex from "/src/utils/findex";
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/Check';
import Slider from "./Slider"
// import { filter } from "lodash";
// import Slider from '@mui/material/Slider';

export default function ({ filter, setFilter, dictionaries }) {

  var selectorOptionsSector = useMemo(() => {
    if (!dictionaries.sector.isLoading && !dictionaries.sector.isError) {
      const sectorsNames = dictionaries.sector.data.name_eng;
      const filterSector = whichTrue(
        intersection(sectorsNames, [
          "Taxes less subsidies on intermediate and final products",
        ]).map((x) => !x)
      );
      const sectorNamesFilt = findex(sectorsNames, filterSector);
      const aggrSecNamFilt = findex(
        dictionaries.sector.data.level_1_eng,
        filterSector
      );
      const aggrSecNamUniq = unique(aggrSecNamFilt);

      const selectorOptionsSector = [];
      for (let i = 0; i < aggrSecNamUniq.length; i++) {
        selectorOptionsSector.push({
          label: aggrSecNamUniq[i],
          options: findex(
            sectorNamesFilt,
            whichTrue(intersection(aggrSecNamFilt, [aggrSecNamUniq[i]]))
          ).map(x => ({ label: x, value: x })),
        });
      }
      return selectorOptionsSector;
    } else {
      return;
    }
  }, [dictionaries.sector]);

  var selectorOptionsCountry = useMemo(() => {
    if (!dictionaries.country.isLoading && !dictionaries.country.isError) {
      const countryNames = dictionaries.country.data.name_eng;
      const filterCountry = whichTrue(
        intersection(countryNames, [
          "Mexico - Activities excluding Global Manufacturing",
          "Mexico - Global Manufacturing activities",
          "China - Activities excluding export processing",
          "China - Export processing activities",
          "TOTAL",
        ]).map(x => !x)
      );
      const countryNamesFilt = findex(countryNames, filterCountry);
      const aggrConNamFilt = findex(
        dictionaries.country.data.continent,
        filterCountry
      );
      const aggrConNamUniq = unique(aggrConNamFilt).sort();

      const selectorOptionsCountry = [];
      for (let i = 0; i < aggrConNamUniq.length; i++) {
        selectorOptionsCountry.push({
          label: aggrConNamUniq[i],
          options: findex(
            countryNamesFilt,
            whichTrue(intersection(aggrConNamFilt, [aggrConNamUniq[i]]))
          ).map(x => ({ label: x, value: x })),
        });
      }
      return selectorOptionsCountry;
    } else {
      return;
    }
  }, [dictionaries.country]);

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: "bold",
    color: "black"
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  const [sector_nClone, setSector_nClone] = useState(
    filter.values.sector_n
  );

  function changeCountry(event) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      updatedBy: "other",
      values: {
        ...prevFilter.values,
        country: event.value,
      },
    }));
  }

  function changeSector(event) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      updatedBy: "other",
      values: {
        ...prevFilter.values,
        sector: event.value,
      },
    }));
  }
  function changeIntOnly(event) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      updatedBy: "other",
      values: {
        ...prevFilter.values,
        international_only: !prevFilter.values.international_only
        // international_only: event.target.checked,
      },
    }));
  }

  function changeSectorN(event) {
    setSector_nClone(event.target.value);
    setTimeout(
      () =>
        setFilter((prevFilter) => ({
          ...prevFilter,
          updatedBy: "other",
          values: {
            ...prevFilter.values,
            sector_n: Number(event.target.value),
          },
        })),
      1000
    );
  }

  function changeTotalEffects(event) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      updatedBy: "other",
      values: {
        ...prevFilter.values,
        total_effects: !prevFilter.values.total_effects
        // international_only: event.target.checked,
      },
    }));
  }

  return (
    <div className="filter-tool">
      <div className="filter-country">
        <h4 className="filter-tool-header">Select Country</h4>
        <Select
          id="country_selector"
          className="filter-tool-selector"
          defaultValue={filter.values.country}
          value={{
            label: filter.values.country,
            value: filter.values.country,
          }}
          options={selectorOptionsCountry}
          formatGroupLabel={formatGroupLabel}
          onChange={changeCountry}
        />
      </div>
      <div className="filter-sector">
        <h4 className="filter-tool-header">Select Sector</h4>
        <Select
          className="filter-tool-selector"
          defaultValue={filter.values.sector}
          value={{
            label: filter.values.sector,
            value: filter.values.sector,
          }}
          options={selectorOptionsSector}
          formatGroupLabel={formatGroupLabel}
          onChange={changeSector}
        />
      </div>
      
      <div className="filter-only-int-links">
        <h4 className="filter-tool-header">Show Only International Links</h4>
        <ToggleButton 
        className="filter-only-int-links-checkbox" 
        value="check" 
        color="primary"
        selected={filter.values.international_only} 
        onChange={changeIntOnly}
        style={{marginLeft: "1rem"}}
        >
          <CheckIcon />
        </ToggleButton>
      </div>
      <div className="filter-total-effects">
        <h4 className="filter-tool-header">Show Total Effects</h4>
        <ToggleButton 
        className="filter-total-effects-checkbox" 
        value="check" 
        color="primary"
        selected={filter.values.total_effects} 
        onChange={changeTotalEffects}
        style={{marginLeft: "1rem"}}
        >
          <CheckIcon />
        </ToggleButton>
      </div>
        <Slider 
        changeSectorN={changeSectorN}
        sector_nClone={sector_nClone}
        sector_n={filter.values.sector_n}
        />
    </div>
  );
}
