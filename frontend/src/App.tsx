import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/include-aliases";
import "@formatjs/intl-relativetimeformat/dist/locale-data/en";
import "@formatjs/intl-relativetimeformat/dist/locale-data/fr";

import messages_en from "./locales/en.json";
import messages_fr from "./locales/fr.json";

import LocaleProvider, { LocaleSwitcher } from "./components/localeProvider";
import { Home, Developers, Projects, NotFound } from "./pages";
import { QUERY_CACHE_TIME, QUERY_STALE_TIME } from "./config";
import AppHeader from "./components/appHeader";
import ThemeProvider from "./components/utils/ThemeProvider";

const messages = {
  en: messages_en,
  fr: messages_fr,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      cacheTime: QUERY_CACHE_TIME,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleSwitcher.Provider>
        <LocaleProvider messages={messages}>
          <BrowserRouter>
            <ThemeProvider>
              <AppHeader />
              <Switch>
                <Route component={Home} exact={true} name="Login Page" path="/" />
                <Route component={Developers} exact={true} name="Register Page" path="/developers" />
                <Route component={Projects} exact={true} name="Register Page" path="/projects" />
                <Route component={NotFound} name="Page 404" />
              </Switch>
            </ThemeProvider>
          </BrowserRouter>
        </LocaleProvider>
      </LocaleSwitcher.Provider>
    </QueryClientProvider>
  );
};

export default App;
