import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";

import {
  ChannelDetail,
  VideoDetail,
  SearchFeed,
  Navbar,
  Feed,
} from "./components";

const queryClient = new QueryClient();

function App() {
  const mainRef = useRef(null);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Box sx={{ position: "sticky", top: 0, zIndex: 10 }}>
          <Navbar mainRef={mainRef} />

          <Routes>
            <Route path="/" element={<Feed mainRef={mainRef} />} />
            <Route
              path="/video/:id"
              element={<VideoDetail mainRef={mainRef} />}
            />
            <Route
              path="/channel/:id"
              element={<ChannelDetail mainRef={mainRef} />}
            />
            <Route
              path="/search/:searchTerm"
              element={<SearchFeed mainRef={mainRef} />}
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
