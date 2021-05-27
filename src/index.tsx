import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Global } from "@emotion/react";

function Fonts() {
  return <Global styles={`@import url('https://rsms.me/inter/inter.css');`} />;
}

const queryClient = new QueryClient();

const theme = extendTheme({
  fonts: {
    heading: "Inter, system-ui",
    body: "Inter, system-ui",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <CSSReset />
    <ChakraProvider theme={theme}>
      <Fonts />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
