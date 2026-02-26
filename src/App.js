import { useState } from "react";
import { Box, Container, VStack } from "@chakra-ui/react";
import Main from "./components/Main";
import Result from "./components/Result";
import History from "./components/History";
import Features from "./components/Features";
import Footer from "./components/Footer";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [historyRefresh, setHistoryRefresh] = useState(0);

  const handleShorten = (url) => {
    setInputValue(url);
    setHistoryRefresh((n) => n + 1);
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(135deg, #0f0c29, #302b63, #24243e)"
      fontFamily="'Space Grotesk', sans-serif"
    >
      <Container maxW="2xl" py={16} px={4}>
        <VStack spacing={10} align="stretch">
          <Main setInputValue={handleShorten} />
          <Result inputValue={inputValue} />
          <Features />
          <History refresh={historyRefresh} />
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
