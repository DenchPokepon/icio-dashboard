import React, { useState }  from "react"
import { useQuery } from '@tanstack/react-query'
import Navbar from "../components/common/Navbar"
import FilterTool from "../components/IoChain/FilterTool"
import EchartsIoGraph from "../components/IoChain/EchartsIoGraph"
import Timeline from "../components/IoChain/Timeline"
import ioChainLoad from "../api/ioChainLoad"


export default function IoChain({ dictionaries }) {
  
  const [filter, setFilter] = useState({
    updatedBy: "other",
    values: {
      country: 'Russian Federation',
      sector: 'Mining and quarrying, energy producing products',
      international_only: false,
      year: 2018,
      sector_n: 10,
      total_effects: false
    }
  })

  const visData = useQuery({
    queryKey: [filter.values],
    queryFn: ({ queryKey }) => {
      const body = queryKey[0]
      const response = ioChainLoad(body)
      return response
    },   
  })

    return (
        <div>
            <Navbar />
            <div className="grid-container">
                <FilterTool 
                  className="filter-tool"
                  filter={filter}
                  setFilter={setFilter}
                  dictionaries={dictionaries}
                />
                <EchartsIoGraph 
                  className="EchartsIoGraph"
                  visData={visData}
                  filter={filter}
                  setFilter={setFilter}
                  dictionaries={dictionaries}
                />
            </div>
            <Timeline 
            filter={filter}
            setFilter={setFilter}
            dictionaries={dictionaries}
            />
        </div>
    )
}
