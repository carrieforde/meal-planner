import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "mui";
import type { AppProps } from "next/app";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
export default MyApp;
