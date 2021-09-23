import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store/index";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { THEME } from "global-style";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
      useErrorBoundary: true,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
    },
  },
});

const AllProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ThemeProvider theme={THEME}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

const customRender = (ui, options?) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
