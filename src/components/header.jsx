import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { css } from "@emotion/css"
import { useToast,useDisclosure,Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton,Tabs,TabList,TabPanels,Tab,TabPanel, useColorMode, useColorModeValue} from "@chakra-ui/react";
import { PrimaryButton, PrimaryForm, Div } from "../styles/styled";
import { useAuth } from "../hooks/use-auth.jsx";

export default ({ children }) => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("")
  const [usernamelogin, setUsernamelogin] = React.useState("");
  const [passwordlogin, setPasswordlogin] = React.useState("");
  const toast = useToast();
  const [opennav, setOpennav] = React.useState(false);
  const { user, login, logout, fetched, create } = useAuth();
  
  
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue("#fff;", "#151922;")

  React.useEffect(() => {
    if (!user?.username && fetched) {
      toast({title: "Bye !",description: "You disconnected from your account.",position: "top",status: "info",duration: 2000,isClosable: true});
    }
  }, [user]);

  async function handleSubmitlogin(event) {
    event.preventDefault();
    const content = await login(usernamelogin, passwordlogin);
    if (content.error) {
      () => console.log("toast");
      toast({title: "Error !",description: content.message? content.message: "something wrong happend",position: "top",status: "error",duration: 3000,isClosable: true});
    } else {
      () => console.log("toast");
      onClose();
      toast({title: `Welcome back, ${usernamelogin}!`,description: content.message? content.message: "You logged into your account !",position: "top",status: "success", duration: 3000, isClosable: true});
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const content = await create(username, password, email)
    console.log(content)
    if (!content) return;
    if (content.error) {
      () => console.log("toast");
      toast({title: "Error !",description: content.message,position: "top",status: "error", duration: 3000,isClosable: true});
    } else {
      () => console.log("toast");
      onClose();
      toast({ title: `Welcome, ${username}!`,description: content.message? content.message: "Your account have been created !",position: "top",status: "success",duration: 3000,isClosable: true});
    }
   
  }
  return (
    <>
      <Div className="header" bg={bg}>
        {fetched && (
          <>
          <div className={css`display: flex; align-items: center;`}>
            <div className={css`padding: 0 30px;`}>
              <button
                onClick={() => {
                  if (opennav) {
                    setOpennav(false);
                  } else {
                    setOpennav(true);
                  }}}>
                <i className={`material-icons iconSidebar ${opennav ? "activebtn" : "disablebtn"} ${css`font-size: 30px !important;color: #9e9e9e;`}`} >
                  {opennav ? "close" : "menu"}
                </i>
              </button>
            </div>
            <div>
              <Link to="/" className="imageContainer">
                <img
                  className="logo"
                  src="https://cdn.glitch.com/190d8bdf-8b1a-43fc-994d-fab0bd173689%2F755243061088616458.gif?v=1623586066252"
                ></img>
                <div>
                  <span className="letsgo">css</span><span className="letsgocss">.surf</span>
                </div>
              </Link>
            </div>
          </div>
          <div className={css`display: flex;`}>
            {/* useless for the moment
            <Link to="/premium" className="premiumButton">
              <span className="premium">premium</span>
            </Link>
            */}
            <div onClick={toggleColorMode} className={css`display: flex;align-items: center;`}>
              <span className="material-icons iconSwitch">{colorMode === "light" ? "brightness_3" : "light_mode" }</span>
            </div>
            <div className={css`margin: 0px 25px;`}>
              {fetched && user?.username ? (
                <div>{fetched ? user?.username : ""}</div>
              ) : (
                <PrimaryButton onClick={onOpen} className={css`margin: 0px;`} >
                  <i className="material-icons iconbar">add_box</i> Join
                </PrimaryButton>
              )}
            </div>
          </div>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Join</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Tabs colorScheme="twitter">
                  <TabList className={css`flex-direction: row;justify-content: space-around!important;align-items: center;border: none;`}>
                    <Tab>Create</Tab>
                    <Tab>Log in</Tab>
                  </TabList>
                  <TabPanels className={css`font-family: "Barlow";letter-spacing: 0.2px;font-weight: 500;`}>
                    <TabPanel>
                      <div className="logindiv">
                        <form onSubmit={handleSubmit}>
                          <div>
                            <div>E-mail</div>
                            <PrimaryForm
                              placeholder="test@exemple.com"
                              type="email"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                            />
                          </div>
                          <div>
                            <div>
                              <div>Username</div>
                              <PrimaryForm
                                placeholder="between 3-12 char"
                                type="input"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <div>Password</div>
                            <PrimaryForm
                              placeholder="between 4-20 char"
                              type="password"
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="vh">
                            <PrimaryButton type="submit">
                              <div>Create</div>{" "}
                              <i className="material-icons iconbar">
                                double_arrow
                              </i>
                            </PrimaryButton>
                          </div>
                        </form>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="registerdiv">
                        <form onSubmit={handleSubmitlogin}>
                          <div>
                            <div>
                              <div>Username</div>
                              <PrimaryForm
                                placeholder="between 3-12 char"
                                type="input"
                                value={usernamelogin}
                                onChange={e => setUsernamelogin(e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <div>Password</div>
                            <PrimaryForm
                              placeholder="between 4-20 char"
                              type="password"
                              value={passwordlogin}
                              onChange={e => setPasswordlogin(e.target.value)}
                            />
                          </div>
                          <div className="vh">
                            <PrimaryButton type="submit">
                              <div>Login</div>{" "}
                              <i className="material-icons iconbar">
                                double_arrow
                              </i>
                            </PrimaryButton>
                          </div>
                        </form>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ModalBody>
            </ModalContent>
          </Modal>
          </>
        )}
      </Div>
      <div className={css` display: flex; `} >
        <Div bg={bg} className={`sidebar ${css`z-index: 10;`}`} style={{ opacity: `${opennav ? "1" : "0"}`, width: `${opennav ? "225px" : "0px"}`, }} >
          <div className="buttonSidebar" style={{ display: `${opennav ? "flex" : "none"}` }} >
            <div>
              <div className={`sidebarText ${css`color: ${colorMode === "light" ? "#828282a8;" : "#b6b6b6;"}`}`}>MAIN</div>
              <Link to="/" onClick={() => setOpennav(false)}>
                <div className={`case ${location.pathname === "/" ? "active" : ""} ${css`color: ${colorMode === "light" ? "#7b7b7b;" : "#d9d9d9;"}background-image: ${location.pathname === "/" ? colorMode === "light" ? "linear-gradient(to right, #ffffff00 0%, #b5eeff75 100%);": "linear-gradient(to right, #ffffff00 0%, #2b3e6859 100%);" : ""}`}`}>
                  <i className="material-icons iconbar">widgets</i>discover
                </div>
              </Link>
              <Link to="/new" onClick={() => setOpennav(false)}>
                <div className={`case ${location.pathname === "/new" ? "active" : ""} ${css`color: ${colorMode === "light" ? "#7b7b7b;" : "#d9d9d9;"}background-image: ${location.pathname === "/new" ? colorMode === "light" ? "linear-gradient(to right, #ffffff00 0%, #b5eeff75 100%);": "linear-gradient(to right, #ffffff00 0%, #2b3e6859 100%);" : ""}`}`} >
                  <i class="material-icons iconbar">add_chart</i>new
                </div>
              </Link>
              {user?.username && (
                <>
                  <div className={`sidebarText ${css`color: ${colorMode === "light" ? "#828282a8;" : "#b6b6b6;"}`}`}>PROFILE</div>
                  <Link to="/settings">
                    <div className={`case ${location.pathname === "/settings" ? "active" : ""} ${css`color: ${colorMode === "light" ? "#7b7b7b;" : "#d9d9d9;"}background-image: ${location.pathname === "/settings" ? colorMode === "light" ? "linear-gradient(to right, #ffffff00 0%, #b5eeff75 100%);": "linear-gradient(to right, #ffffff00 0%, #2b3e6859 100%);" : ""}`}`}>
                      <i className="material-icons iconbar">settings</i>settings
                    </div>
                  </Link>
                </>
              )}
            </div>
            <div>
              {user?.username && (
                <button onClick={logout}>
                  <div className="logout">
                    <i className="material-icons iconbar">logout</i>logout
                  </div>
                </button>
              )}
            </div>
          </div>
        </Div>
        <div className={css`margin-top: 70px;overflow-x: hidden;width: 100%;`}>
          {children}
        </div>
      </div>
      
    </>
  );
};
