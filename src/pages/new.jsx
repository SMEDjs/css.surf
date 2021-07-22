import * as React from "react";
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import '../styles/theme.css';
import 'codemirror/mode/css/css.js'
import { css } from "@emotion/css"
import { useAuth } from "../hooks/use-auth.jsx";
import { FormikProvider, Field, Form, useFormik } from "formik";
import { RgbaColorPicker } from "react-colorful";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { IFrameComponent } from '../components/iframe.jsx';
import { useToast,  Popover, PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,PopoverFooter,PopoverArrow,PopoverCloseButton,Button,Tooltip,useDisclosure, useColorMode, useColorModeValue, Box, useRadioGroup } from "@chakra-ui/react"
import RadioCard from "../components/choice"
import { PrimaryButton, BButton } from "../styles/styled";
import { ElementHelmet } from "../components/elementHelmet";
import rgbHex from 'rgb-hex';

export default function New() {
  const { component, text } = useAuth();
  const toast = useToast()
  const [pasted, setPasted] = React.useState(false)
  const [type, setType] = React.useState("")
  const [texts, setTexts] = React.useState({})
  const [color, setColor] = React.useState({r: 255, g: 255, b:255, a:1})
  const [hex, setHex] = React.useState("#fff")
  const { colorMode } = useColorMode()
  const bg = useColorModeValue("#fff;", "#151922;")
  const bgInverted = useColorModeValue("#151922;", "#fff;");  
  const formik = useFormik({ 
    initialValues: {
       type: "",
      name: `Untitled`,
      code: "",
            text: "",
            icon: "",
            emoji: "",
            description: "",
    },
    onSubmit: async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            const rawResponse = await component(values)
            if(rawResponse.error) {
              toast({ title: "Error !", description: rawResponse.message ? rawResponse.message : "Something is wrong !", position: "top", status: "error", duration: 3000, isClosable: true });
            } else {
              toast({ title: `successfully posted !`, position: "top-right", duration: 1000, status: "success", isClosable: true, })
            }
          }
  })
  

  async function fetchTexts() {
    const results = await text()
    if(results.error) return;
    setTexts(results.text)
  }
  
    React.useEffect(() => {
      fetchTexts()
      setFieldValue("code", type === "button" ? ".custom-button {\n  color: white;\n  background: #363946;\n  padding: 10px 20px;\n  border-radius: 15px;\n  border: none;\n}" : type === "div" ? 
        ".custom-div {\n  color: #373737;\n  background-color: white;\n  border-radius: 10px;\n  padding: 10px 50px;\n  letter-spacing: 1px;\n  font-family: monospace;\n}" : 
        ".custom-input {\n  color: #373737;\n  border-radius: 15px;\n  padding: 5px 15px;\n  box-shadow: #64646f33 0px 7px 29px 0px;\n  outline: none;\n  border: none;\n}",)
      setFieldValue("type", type)
      setFieldValue("input", type === "button" ? "Button" : type === "div" ? "Div" : "Input")
    }, [type])
    const { getRadioProps } = useRadioGroup({
      name: "framework",
      defaultValue: type === "button" ? "Button" : type === "div" ? "Div" : "Input",
      onChange: (value) => setFieldValue("text", value),
    })
  const { values, setFieldValue } = formik;
  if(!type) return(
    <>
      <ElementHelmet t={`choosing`} d="Choose an element"></ElementHelmet>
      <div className={css`align-items: center;display: flex;flex-direction: column;width: 100vw;`}>
        <div className={css`width: 100vw;font-size: 32px;display: flex;place-content: center; margin-top: 4vh;text-align: center;`}>
          What type of element you  want to make
        </div>
        <div className={css`height: 50vh;display: flex;@media only screen and (max-width: 850px) {flex-flow: column;}`}>
          <Box className={`choice ${css`background: #00c4ff`}`} onClick={() => {setType("button");setFieldValue("text", "Button")}}>button</Box>
          <Box className={`choice ${css`background: #00c4ff`}`} onClick={() => {setType("div");setFieldValue("text", "Div")}}>div</Box>
          <Box className={`choice ${css`background: #00c4ff`}`} onClick={() => {setType("input");setFieldValue("text", "Input")}}>input</Box>
        </div>
      </div>
    </>
  )
 
  return (
    <>
      <ElementHelmet t={`${values?.type ? values?.type : ""}`}></ElementHelmet>
      <div className={css`flex-flow: column;`}>
        <div onClick={() => setType("")} class="goBack">
          <i class="fas fa-long-arrow-alt-left"></i>
        </div>
        <FormikProvider value={formik}>

          <Form class="formDb" className={css`    height: 90vh;`}>
            <div className={css`display: flex; align-items: center; justify-content: center;`}>
              <label htmlFor="name">
                <i className="fas fa-pencil-alt"></i>
              </label>
              <Field id="name" name="name" placeholder="Project Name" class="title" />
            </div>
            <div className="topeditor">
              <div className="topstatus leftstatus">
                <div>css</div>
                <div className={css`display: flex;align-items: center;`}>
                  <div>
                    <Tooltip label="reset code" aria-label="reset code" placement="top">
                      <i className="fas fa-trash-alt iconDelete" onClick={() => { setFieldValue("code", ".custom-button {\n\n}")}}>
                      </i>
                    </Tooltip>
                  </div>
                  <Popover placement="top-start">
                    <PopoverTrigger>
                      <Button bg={hex} borderRadius="50%" cursor="pointer" p="0" minWidth="0" boxShadow="none" w="18px" h="18px" _hover={{ background: `${hex}`}} _focus={{ background: `${hex}`}}></Button>
                    </PopoverTrigger>
                    <PopoverContent bg={bg} color={bgInverted} className={css`box-shadow: 0 0 0 0!important;`}>
                      <PopoverHeader fontWeight="semibold">color picker</PopoverHeader>
                      <PopoverArrow />
                      <div>
                        <PopoverCloseButton size="md" className={css`box-shadow: 0 0 0 0!important;`} />
                      </div>
                      
                      <PopoverBody>
                        <div>
                          <div className={css`display: flex;`}>
                            <RgbaColorPicker color={color} onChange={(e) => {setColor(e);setHex(`#${rgbHex(e.r, e.g, e.b, e.a ? e.a : 1)}`)}} />
                            <div className={css`margin-left: 15px;border-radius: 15px;background: ${hex}; width: 30%;`}></div>
                          </div>
                          <div className={css`margin: 20px 5px;cursor: pointer;`}>
                            <CopyToClipboard text={hex}
                              onCopy={() => toast({ title: `copied ${hex} !`, position: "top-right", duration: 3000, status: "success", isClosable: true, })}>
                              <span>
                                <input value={hex} className={css`outline: none;background: transparent;cursor: pointer;`} readOnly />
                                <i class="fas fa-copy"></i>
                              </span>
                            </CopyToClipboard>
                            <CopyToClipboard text={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}
                              onCopy={() => toast({ title: `copied ${`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`} !`, position: "top-right", duration: 3000, status: "success", isClosable: true, })}>
                              <span>
                                <input value={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`} className={css`outline: none;background: transparent;cursor: pointer;`} readOnly />
                                <i class="fas fa-copy"></i>
                              </span>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div class="topstatus rightstatus">
                render
              </div>
            </div>
              <div class="editor">
                  <CodeMirror
                    value={values.code}
                    height="30vh"
                    width="45vw"
                    style="border-radius: 15px 0 0 15px;"
                    onChange={(from, to, text, removed, origin) => {
                      formik.setFieldValue("code", from.getValue())
                    }}
                    options={{
                      theme: 'monokai',
                      keyMap: 'sublime',
                      mode: 'css',
                    }}
                  />
              <div class="cardRender" id="cardRender">
                <IFrameComponent head={
                  <>
                    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
                    <style>
                      {values.code}
                    </style>
                    <style>
                      {"body {display: flex;align-items: flex-start;place-content: center;}@media only screen and (max-width: 700px) {body {align-items: center;}"}
                    </style>
                  </>}>
                  {type === "button" ? (
                      <button class="custom-button"             
                        onClick={() => toast({ title: `button clicked`, position: "top-right",duration: 1000,status: "success",isClosable: true,})}>
                        {values.icon ? <i class={`fas fa-${values.icon} icon`}></i> : ""}{values.text}
                      </button>
                  ) : (
                    type === "div" ? (
                      <div className="custom-div">
                        {values.icon ? <i class={`fas fa-${values.icon} icon`}></i> : ""}{values.text}
                      </div>
                    ) : (
                       <input class="custom-input" value={values.text} readOnly />
                    )
                  )}
                </IFrameComponent>
              </div>
            </div>
            <div className={css`margin-top: 4vh;display: flex;flex-direction: column;align-items: center;`}>
              <div className={css`display: flex;align-items: center;place-content: space-around;width: 90vw;`}>
                {values.type === "button" || values.type === "div" ? (
                <div>
                  <Popover placement="top-start">
                    <PopoverTrigger>
                      <Button className={css`box-shadow: 0px 4px 13px 8px rgb(40 42 51 / 7%)!important;`}><i class={`fas fa-${values.icon ? values.icon : "icons"}`}></i></Button>
                    </PopoverTrigger>
                    <PopoverContent bg={bg} color={bgInverted} className={css`box-shadow: 0 0 0 0!important;`}>
                      <PopoverHeader fontWeight="semibold">{values.type} icon</PopoverHeader>
                      <PopoverArrow />
                      <div>
                        <Tooltip hasArrow label="Paste CSS for the icon" bg="#f1f1f1" color="black" placement="top">
                          <i onClick={() => {if(!pasted) setFieldValue("code", values.code + "\n.icon {\n  padding: 0 10px 0 0;\n}");setPasted(true) }} class="fas fa-clone iconPopojoy"></i>
                        </Tooltip>
                        <PopoverCloseButton size="md" className={css`box-shadow: 0 0 0 0!important;`} />
                      </div>
                      <PopoverBody>
                        <div>
                          <div class="popojoys">
                            <button type="button" class="popojoy red" onClick={() => setFieldValue("icon", "")}><i class="fas fa-times"></i></button>
                            {texts?.icons?.free?.map(e => {
                              return (
                                <BButton key={e} type="button" color={colorMode === "light" ? "#444444;" : "#e1e1e1d6;"}  className="popojoy" onClick={() => setFieldValue("icon", e)}>
                                  <i class={`fas fa-${e} icon`}></i>
                                </BButton>
                              )
                            })}
                          </div>
                        </div>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </div>
                ):(<></>)}
                <div>
                  <Popover placement="left-start">
                    <PopoverTrigger>
                      <Button className={css`box-shadow: 0px 4px 13px 8px rgb(40 42 51 / 7%)!important;`}><i class={`fas fa-font`}></i></Button>
                    </PopoverTrigger>
                    <PopoverContent bg={bg} color={bgInverted}  css={css`box-shadow: 0 0 0 0!important;`}>
                      <PopoverHeader fontWeight="semibold">text</PopoverHeader>
                      <PopoverArrow />
                      <div>
                        <PopoverCloseButton size="md" className={css`box-shadow: 0 0 0 0!important;`} />
                      </div>
                      
                      <PopoverBody>
                        <div className={css`display: flex;flex-flow: wrap;`}>
                          {values.type === "button" &&
                                texts?.options?.freeB?.map((value, i) => {
                                  const radio = getRadioProps({ value })
                                  return (
                                    <RadioCard key={i} {...radio} className={css`padding: 10px 20px;width: fit-content;margin: 0px 10px 15px 0px;`}>
                                      {value}
                                    </RadioCard>
                                  )
                                })
                          }
                          {values.type === "div" ? 
                               texts?.options?.freeD?.map((value, i) => {
                                  const radio = getRadioProps({ value })
                                  return (
                                    <RadioCard key={i} {...radio} className={css`padding: 10px 20px;width: fit-content;margin: 0px 10px 15px 0px;`}>
                                      {value}
                                    </RadioCard>
                                  )
                                }):null
                          }
                          {values.type === "input" ? 
                                texts?.options?.freeI?.map((value, i) => {
                                  const radio = getRadioProps({ value })
                                  return (
                                    <RadioCard key={i} {...radio} className={css`padding: 10px 20px;width: fit-content;margin: 0px 10px 15px 0px;`}>
                                      {value}
                                    </RadioCard>
                                  )
                                }):null
                          }
                        </div>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </div>   
                <div>
                  <Popover placement="top-start">
                    <PopoverTrigger>
                      <Button className={css`box-shadow: 0px 4px 13px 8px rgb(40 42 51 / 7%)!important;`}>
                        {values.emoji ? (
                          <div>{values.emoji}</div>
                        ): (
                          <i class="fas fa-ellipsis-h"></i>
                        )}
                        
                      
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent bg={bg} color={bgInverted} className={css`box-shadow: 0 0 0 0!important;`}>
                      <PopoverHeader fontWeight="semibold">emoji</PopoverHeader>
                      <PopoverArrow />
                      <div>
                        <PopoverCloseButton size="md" className={css`box-shadow: 0 0 0 0!important;`} />
                      </div>
                      
                      <PopoverBody>
                        <div>
                          <div class="popojoys">
                            <button type="button" class="popojoy red" onClick={() => setFieldValue("emoji", "")}><i class="fas fa-times"></i></button>
                            {texts?.emojis?.free?.map(e => {
                              return (
                                <button key={e} type="button" class="popojoy" onClick={() => setFieldValue("emoji", e)}>
                                  {e}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className={css`display: flex;align-items: center; place-content: space-around;    margin-top: 4vh;`}>
                <div className={css`width: 40vw;`}>
                  <Field className={`input ${css`background: ${colorMode === "light" ? "#fcfcfc;" : "#2c313d"}`}`} name="description" value={values.description} placeholder="Describe your creation..." autoComplete="off"></Field>
                </div>
              </div>
            </div>
            <div className={css`display: flex;justify-content: center;margin: 4vh;`}>
              <PrimaryButton type="submit" w="45vw">
                Submit
                <i class="material-icons iconbar">double_arrow</i>
              </PrimaryButton>
            </div>
            
          </Form>
        </FormikProvider>
      </div>
      
    </>
  );
}