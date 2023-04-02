import React, { useRef } from "react";
import { Chrono } from "react-chrono";
import array2NamedArray from "/src/utils/array2NamedArray";
import rem2Px from "/src/utils/rem2Px";

export default function Timeline({ filter, setFilter, dictionaries }) {
  const chronoRef = useRef(null);

    if (chronoRef.current) {
        let chronoRefInnerChildren = chronoRef.current.querySelector('ul[data-testid="timeline-collection"]').childNodes
        chronoRefInnerChildren.forEach((node) => {
          let year = Number(node.querySelector('div[data-testid="timeline-circle"]').getAttribute("aria-label"))
          if (year === filter.values.year) {
              node.querySelector('div[data-testid="timeline-circle"]').classList.add("active")
              node.querySelector('div[data-testid="timeline-title"]').classList.add("active")
              node.querySelector('div[data-testid="timeline-title"] > div').classList.add("active")
          } else {
              node.querySelector('div[data-testid="timeline-circle"]').classList.remove("active")
              node.querySelector('div[data-testid="timeline-title"]').classList.remove("active")
              node.querySelector('div[data-testid="timeline-title"] > div').classList.remove("active")

              node.querySelector('div[data-testid="timeline-circle"]').classList.add("in-active")
          }
      })
    }

  return (
    <div className="year-timeline" ref={chronoRef}>
      <Chrono
        items={array2NamedArray(dictionaries.years, "title")}
        mode="HORIZONTAL"
        cardLess={true}
        activeItemIndex={ Number(filter.values.year) - Math.min(...dictionaries.years) }
        itemWidth={rem2Px(4)}
        fontSizes={{ title: 14 }}
        classNames={{ controls: "year-timeline-controls" }}
        onItemSelected={function changeYear(event) {
          setFilter((prevFilter) => ({
            ...prevFilter,
            updatedBy: "other",
            values: {
              ...prevFilter.values,
              year: event.title,
            },
          }));
        }}
      />
    </div>
  );
}


