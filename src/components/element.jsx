import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Tooltip, useColorModeValue, useToast, useDisclosure, ModalOverlay,ModalContent, ModalHeader,ModalFooter,ModalBody,ModalCloseButton, Modal, Avatar, Box } from "@chakra-ui/react"

import { under } from "../styles/iframecss.js";
import { css } from "@emotion/css"
import { IFrameComponent } from '../components/iframe.jsx';
import { useAuth } from "../hooks/use-auth.jsx";
import { Div } from "../styles/styled";
import {CopyToClipboard} from 'react-copy-to-clipboard';
export const Element = ((props) => {
  const { user, like, deleteComp } = useAuth();
  const toast = useToast()
  const bgInverted = useColorModeValue("#151922", "#ffffff")
  const bg = useColorModeValue("#ffffff", "#151922")
  const { isOpen: EisOpen, onOpen: openElement, onClose: EonClose } = useDisclosure() // element modals 
  const { isOpen, onOpen, onClose } = useDisclosure() // user modals
  const [info, setInfo] = React.useState({})
 
  return (
    <>
      <Modal isOpen={EisOpen} onClose={EonClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader d="flex" alignItems="center">
            <CopyToClipboard text={props.e.code} onCopy={() => toast({ title: `css copied !`, position: "top-right", duration: 3000, status: "success", isClosable: true, })}>
              <span className={css`cursor: pointer;`}>{props.e.components.emoji} {props.e.name}</span>
            </CopyToClipboard>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" className={css`flex-direction: column;`}> 
            <IFrameComponent className={css`width: 280px;height: 100px;`} head={
                      <>
                        <style>
                          {props.e.code}
                        </style>
                        <style>
                          {under}
                        </style>
                        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
                      </>
                    }>
                    {props.e.components.type === "button" ? (
                    <CopyToClipboard text={props.e.code} onCopy={() => toast({ title: `css copied !`, position: "top-right", duration: 3000, status: "success", isClosable: true, })}>
                      <button class="custom-button">
                        {props.e.components.icon ? <i class={`icon fas fa-${props.e.components.icon} `}></i> : ""}{props.e.components.text}
                      </button>
                    </CopyToClipboard>
                    ):(
                      props.e.components.type === "div" ? (
                        <div class="custom-div">
                          {props.e.components.icon ? <i class={`icon fas fa-${props.e.components.icon} `}></i> : ""}{props.e.components.text}
                        </div>
                      ):(
                        <input class="custom-input" value={props.e.components.text} readOnly />
                      )  
                    )}
                    </IFrameComponent>
            <div className={css`display: flex;flex-flow: column;`}>
              <CopyToClipboard text={props.e.code} onCopy={() => toast({ title: `css copied !`, position: "top-right", duration: 3000, status: "success", isClosable: true, })}>
                <button className={`buttonProfile ${css`background: #65ff7b;`}`}>copy css</button>
              </CopyToClipboard>
              <CopyToClipboard onCopy={() => toast({ title: `html copied !`, position: "top-right", duration: 3000, status: "success", isClosable: true, })} text={props.e.components.type === "button" ? '<button class="custom-button">\n\n</div>' : props.e.components.type === "div" ? '<div class="custom-div">\n\n</div>' : '<input class="custom-input" />'} >
  
                <button className={`buttonProfile ${css`background: #d9d613;`}`}>copy html</button>
              </CopyToClipboard>
              <Link to={`/@${props.e.poster.username}`} className="buttonProfile">creator page</Link>
              {props.e.poster._id === user._id && (
                <button className={`buttonProfile ${css`background: #ff5454;margin-top: 20px;`}`} onClick={async () => {
                    const result = await deleteComp(props.e._id);
                    if(result.error) {
                      toast({ title: `Error !`,description: result.message ? result.message : "Something wrong happend", position: "top-right", duration: 3000, status: "error", isClosable: true, })
                    } else {
                      toast({ title: `deleted with success !`, position: "top-right", duration: 3000, status: "success", isClosable: true, })
                      EonClose();  
                      const deleteValue = [...props.results];
                      const object = deleteValue.findIndex(x => x._id == props.e._id);
                      deleteValue.splice(object, 1);
                      props.setResults(deleteValue);
                    }
                    
                  }}>delete</button>
              )}
            </div>  
          
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* ^ element modals ^   \/ user info modals \/   */}
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader d="flex" alignItems="center">
            <Avatar src={info.avatar ? info.avatar : "https://cdn.glitch.com/190d8bdf-8b1a-43fc-994d-fab0bd173689%2Fea2351d7-cb90-465e-85bd-09be90e99170.image.png?v=1625836219811"}></Avatar>
            <Box p="5px 10px">{info.username}</Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" className={css`flex-direction: column;`}> 
              {info.bio && (
                <Box p="5px 10px">{info.bio}</Box>
              )}
            <Link to={`/@${info.username}`} className="buttonProfile">check profile</Link>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className={css`border-radius: 15px;margin: 30px 20px;background: ${bg};`}> 
                  <div css={css`display: flex;align-items: center;justify-content: center;height: 125px;width: 280px;cursor: pointer;`}>
                    <IFrameComponent className={css`width: 280px;`} onClick={() => {openElement();}} head={
                      <>
                        <style>
                          {props.e.code}
                        </style>
                        <style>
                          {under}
                        </style>
                        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
                      </>
                    }>
                    {props.e.components.type === "button" ? (
                      <button class="custom-button">
                        {props.e.components.icon ? <i class={`icon fas fa-${props.e.components.icon} `}></i> : ""}{props.e.components.text}
                      </button>
                    ):(
                      props.e.components.type === "div" ? (
                        <div class="custom-div">
                          {props.e.components.icon ? <i class={`icon fas fa-${props.e.components.icon} `}></i> : ""}{props.e.components.text}
                        </div>
                      ):(
                        <input class="custom-input" value={props.e.components.text} readOnly />
                      )  
                    )}
                    </IFrameComponent>
                  </div>
                  <div className="compName">
                    <div>by 
                      <a target="_blank" class="username" onClick={() => {
                          onOpen();
                          setInfo({username: props.e.poster.username, bio: props.e.poster.bio ? props.e.poster.bio : null, avatar: props.e.poster.avatar});
                      }}> {props.e.poster.username}
                      </a>
                    </div>
                    <CopyToClipboard onCopy={() => toast({ title: `css copied !`, position: "top-right", duration: 3000, status: "success", isClosable: true, })} text={props.e.code} >
                      <Box className={css`display: flex;align-self: flex-end;`}>
                        <Tooltip hasArrow label='copy css' placement="top" bg="#89e189" color='black'>

                            <span className={`material-icons ${css`cursor: pointer;font-size: 20px!important;align-self: flex-end;padding: 2px 4px;border-radius: 5px;;color: ${bgInverted};&:hover { background: ${bgInverted}1f; }`}`} >
                              content_paste
                            </span>

                        </Tooltip>
                      </Box>
                    </CopyToClipboard>
                    <div className="like" onClick={async () => {
                        if(!user._id) return toast({title: `log in to like`,position: "top-right",duration: 1000,status: "error",isClosable: true,})
                        const updateResults = [...props.results];
                        const object = updateResults.find(x => x._id == props.e._id)
                        props.e.like.includes(user._id) ? props.e.like.pop(user._id) : props.e.like.push(user._id)
                        props.setResults(updateResults)
                        const t = await like(props.e._id)
                      }}>
                      <span class={props.e.like.includes(user._id) ? "likeCount transition":"likeCount"}>{props.e.like ? props.e.like.length : 0}</span><i class={`fa${props.e.like.includes(user._id) ? "s liked" : "r"} fa-heart`}></i>
                    </div>
                  </div>
                  <div className={css`position: relative;`}>
                    {props.e.components.emoji && (
                      <Tooltip hasArrow label={props.e.name}  placement="right" bg={bg} color={bgInverted} >
                        <Div className="emojis" bg={bg}>{props.e.components.emoji}</Div>
                      </Tooltip>
                    )}
                  </div>
                </div>
    </>
 ) 
})
