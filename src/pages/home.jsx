import * as React from "react";
import { useAuth } from "../hooks/use-auth.jsx";
import { Skeleton } from "@chakra-ui/react"
import { Element } from "../components/element.jsx"
import { css } from "@emotion/css"

import { ElementHelmet } from "../components/elementHelmet";

export default function Home() {
  const { findComponent, fetchedComp } = useAuth();
  
  const [results, setResults] = React.useState([])
  async function fetchComponents() {
    const results = await findComponent()
    if(results.error) return;
    setResults(results.project)
  }
  React.useEffect(() => {
    fetchComponents();
  }, [])
  return (
    <>
      <ElementHelmet t="build and find css element for your website"  />
      <div className={css`display: flex;justify-content: center;width: 100vw;`}>
        {results && fetchedComp ? (
          <div className={css`display: flex;flex-wrap: wrap;justify-content: center;}`}>
            {results.map(e => {
              return (
                <Element key={e} e={e} results={results} setResults={setResults}></Element>
              )
            })}
          </div>
        ):(
          <>
            <div className={css`display: flex;flex-wrap: wrap;justify-content: center;flex-wrap: wrap;}`}>
              {Array(15).fill(1).map(e => {
                return (
                  <div>
                    <div className={css`border-radius: 15px;margin: 30px 20px;`}>
                      <Skeleton width="280px" height="105px" mb="20px;"></Skeleton>
                      <Skeleton width="280px" height="44px"></Skeleton>
                    </div>
                  </div>
                )

              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
