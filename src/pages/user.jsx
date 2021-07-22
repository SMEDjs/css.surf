import * as React from "react";
import { useAuth } from "../hooks/use-auth.jsx";
import { css } from "@emotion/css"
import {useParams} from "react-router-dom";
import { Avatar, useColorMode, Skeleton } from "@chakra-ui/react"
import { Element } from "../components/element.jsx"
import { ElementHelmet } from "../components/elementHelmet";
export default function User() {
  const { username } = useParams();
  const { getUser, fetched } = useAuth();
  const { colorMode } = useColorMode()
  const [user, setUser] = React.useState({})
  async function fetchUser() {
    const results = await getUser(username)
    setUser(results)
  }
  React.useEffect(() => {
    fetchUser()
  }, [])
  return (
    <>
      <ElementHelmet t={user?.user?.username} d={user?.user?.username ? `See ${user?.user?.username}'s page on css.surf \n ${user?.user?.bio}` : "user not found"}></ElementHelmet>
      <div className={css`width: 100vw;background: ${colorMode === "light" ?  "#daeeff" : "#171d27"}}`}>
        <div>
          {fetched && user ? (
            <div className={css`display: flex;    margin-left: 20px;`}>
              <Avatar m="10px 5px;" src={user?.user?.avatar ? user?.user?.avatar : "https://cdn.glitch.com/190d8bdf-8b1a-43fc-994d-fab0bd173689%2Fea2351d7-cb90-465e-85bd-09be90e99170.image.png?v=1625836219811"} />
              <div className={css`display: flex;flex-flow: column;    margin: 5px;`}>
                <div className={css`font-size: 20px;`}><span className={css`color: #bebebe;margin-right: 2px;`}>@</span>{user?.user?.username}</div>
                {user?.user?.bio && (<div className={css`color: grey;font-size: 15px;`}>{user?.user?.bio}</div>)}
              </div>
            </div>
          ): (
            <div className={css`text-align: center;`}>User not found</div>
          )}
        </div>
      </div>
      <div className={css`display: flex;justify-content: center;width: 100vw;`}>
        {user.projects && fetched ? (
          <div className={css`display: flex;flex-wrap: wrap;justify-content: center;}`}>
            {user.projects.map(e => {
              return (
                <Element e={e}></Element>
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
                      <Skeleton width="280px" height="105px" className={css`margin-bottom: 20px;`}></Skeleton>
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
