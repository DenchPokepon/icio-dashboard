import React, { useEffect, useState }  from "react"
import { useQuery } from '@tanstack/react-query'
import Navbar from "../components/common/Navbar"
import SigmaIoGraph from "../components/IoGraph/SigmaIoGraph"
import ioGraphLoad from "../api/ioGraphLoad"

export default function IoGraph() {

  const [filterValues, setFilterValues] = useState({
    year: 2018,
    absolute_threshold: 1000,
    cluster_by_country: false 
  })

  const { isLoading, isError, data: visOption, error } = useQuery({
    queryKey: [filterValues],
    queryFn: ({ queryKey }) => {
      const body = queryKey[0]
      
      const response = ioGraphLoad(body)
      return response
    },   
  })

  if (isLoading) {
    return (<h1>hello</h1>)
  }
           
    return (
        <div>
            <Navbar />
                {/* <FilterTool 
                  className="filter-tool"
                  filterValues={filterValues}
                  setFilterValues={setFilterValues}
                /> */}
                <SigmaIoGraph 
                  className="SigmaIoGraph"
                  visOption={visOption}
                  dataIsLoading={isLoading}
                  dataIsError={isError}
                  dataError={error}
                />
        </div>
    )
}
