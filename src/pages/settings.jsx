import * as React from "react";
import { css } from "@emotion/css"
import { useAuth } from "../hooks/use-auth.jsx";
import { PrimaryButton } from "../styles/styled";
import { useColorMode, Divider, useToast } from "@chakra-ui/react"
import { Formik, Field, Form } from "formik";
import { ElementHelmet } from "../components/elementHelmet";
export default function Settings() {
  const toast = useToast();
  const { user, settings } = useAuth();
  if(!user._id) return (<div className={css`width: 100vw;`}>you need to be logged</div>)
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <ElementHelmet t={`settings`} d="Modify your profile settings"></ElementHelmet>
      <div className={css`width: 100vw;    display: flex;
    justify-content: center;
    margin: 5vh 0;`}>
        <div className="bgSettings" className={css`background: ${colorMode === "light" ? "#d1eaff" : "#151922"}`}>
          {/* 
          <div>
            <div>
              {user.avatar}
            </div>
            <div>
              <div>Avatar</div>
              <div>
                <button>upload</button>
                <button><span class="material-icons">remove_circle_outline</span></button>
                <button><span class="material-icons">check_circle_outline</span></button>
              </div>
            </div>
          </div> */}
          <Formik
          initialValues={{
            bio: user.bio ? user.bio : "",
            currentPass: "",
            newPass: ""
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            const fetch = await settings(values)
            if(fetch.error) {
              toast({ title: "Error !", description: fetch.message ? fetch.message : "Something is wrong !", position: "top", status: "error", duration: 3000, isClosable: true });
            } else {
              toast({ title: `successfully changed !`, position: "top-right", duration: 1000, status: "success", isClosable: true, })
              values.currentPass = ""
              values.newPass = ""
            }
          }}>
          {
            (
              { values, errors, setFieldValue }
            ) => (
          <Form>
            <div className={css`display: flex;margin: 20px 0px;`}>
              <div className={css`padding: 0 10px;`}><span class="material-icons">manage_accounts</span></div>
              <div>
                <div>Bio</div>
                <Field name="bio" value={values.bio} placeholder="Bio" className="input" />
              </div>
            </div>
            <div className={css`display: flex;margin: 20px 0px;`}>
              <div  className={css`padding: 0 10px;`}>
                <span className="material-icons">enhanced_encryption</span>
              </div>
              <div>
                <div>change password</div>
                <div className={css`display: flex;`}>
                  <Field name="currentPass" type="password" value={values.currentPass}  placeholder="Current password" className={`input ${css`margin-right: 10px;`}`} />
                  <Field name="newPass" type="password" value={values.newPass} placeholder="New password" className={`input ${css`margin-left: 10px;`}`}  />
                </div>
              </div>
            </div> 
            <Divider m="10px 10px 30px 10px" />
            <div>
              <PrimaryButton w="100%" type="submit" value="submit">Save change</PrimaryButton>
            </div>
          </Form>
          )}
        </Formik>
        </div>
        
        
      </div>
    </>
  );
}
