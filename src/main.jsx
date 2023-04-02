import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import IoChain from './pages/IoChain'
import IoGraph from './pages/IoGraph'
import NotFound from './pages/NotFound'
import dictionaryLoad from './api/dictionaryLoad'
import seq from './utils/seq'
import './index.css'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 100000
    },
  },
})


function App() {
  
  const dictionaries = {
    country: useQuery({queryKey: ["dict_country"], queryFn: () => (dictionaryLoad("https://icio-analysis-api.kohea.tel/dict_country"))}),
    sector: useQuery({queryKey: ["dict_sector"], queryFn: () => (dictionaryLoad("https://icio-analysis-api.kohea.tel/dict_sector"))}),
    sector_indicators: useQuery({queryKey: ["dict_sector_indicators"], queryFn: () => (dictionaryLoad("https://icio-analysis-api.kohea.tel/dict_sector_indicators"))}),
    years: seq(1995, 2018)
  }
  
  const routerIoChain = createBrowserRouter([
    {
      path: "/",
      element: <IoChain dictionaries={dictionaries}/>,
      errorElement: <NotFound />
    },
    {
      path: "/graph",
      element: <IoGraph dictionaries={dictionaries}/>,
      errorElement: <NotFound />
    }
  ]);

  return (
    <RouterProvider router={routerIoChain} />
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
