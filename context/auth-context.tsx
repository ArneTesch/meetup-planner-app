import React from "react";

export interface AppContextInterface {
  token: string | null;
  visitorId: string | null;
  login(token: string, visitorId: string, tokenExpiration: string): void;
  logout(): void;
}

export default React.createContext<AppContextInterface>({
  token: null,
  visitorId: null,
  login: (token: string, visitorId: string, tokenExpiration: string) => {},
  logout: () => {}
});
