import React, { useState, useEffect, useContext, createContext } from "react";
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState({});
  const [fetched, setFetched] = useState(false);
  const [fetchedComp, setFetchedComp] = useState(false);
  
  async function server(option) {
    try {
      const headers = {
        Accept: "application/json"
      };
      option.body && (headers["Content-Type"] = "application/json");
      const rawResponse = await fetch(
        `https://css-server.glitch.me${option.url}`,
        {
          method: option.method ? option.method : "POST",
          credentials: "include",
          headers,
          body: JSON.stringify(option.body ? option.body : undefined)
        }
      );
      const content = await rawResponse.json();
      return content;
    } catch (er) {
      return er;
    }
  }
  const getAuthentification = () => {
    return server({ url: "/auth", method: "GET" }).then(user => {
      user.error ? setUser({}) : setUser(user.user);
      user.error ? setFetched(true) : setFetched(true);
     });
  };
  const login = (username, password) => {
    return server({ url: "/login", body: { username, password } }).then(u => {
      !u.error && getAuthentification();
      return u;
    });
  };
  const logout = () => {
    return server({ url: "/logout", method: "DELETE" }).then(user => {
      !user.error && setUser({});
      return user;
    });
  };
  const component = (type, name, code, text, icon, emoji, description) => {
    return server({url: "/new/component", body: {type, name, code, text, icon, emoji, description} }).then(u => {
      return u;
    })
  }
  const findComponent = (before) => {
    return server({url: "/api/component"}).then(u => {
      u.error ? setFetchedComp(false) : setFetchedComp(true)
      return u;
    })
  }
  const create = (username, password, email) => {
    return server({url: "/new", body: {username, password, email}}).then(u => {
      return u;
    })
  }
  const like = (id) => {
    return server({url: "/like", body: {id}}).then(u => {
      return u;
    })
  }
  const getUser = (username) => {
    return server({url: "/api/user", body: {username}}).then(u => {
      setFetched(true);
      return u;
    })
  }
  const deleteComp = (id) => {
    return server({url: "/api/deleteComp", body: {id}}).then(u => {
      return u;
    })
  }
  const settings = (bio, currentPass, newPass) => {
    return server({url: "/settings", body: {bio, currentPass, newPass} }).then(u => {
      return u;
    })
  }
  const subscription = (payment_method, email) => {
    return server({url: "/subscription", body: {payment_method, email} }).then(u => {
      return u;
    })
  }
  const text = () => {
    return server({url: "/api/text" }).then(u => {
      return u;
    })
  }
  useEffect(() => {
    getAuthentification();
  }, []);

  return {
    like,
    user,
    text,
    login,
    logout,
    create,
    fetched,
    getUser,
    settings,
    component,
    deleteComp,
    fetchedComp,
    subscription,
    findComponent,
  };
}
 