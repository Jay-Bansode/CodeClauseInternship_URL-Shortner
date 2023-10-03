import Main from "./components/Main";
import { Box, Container } from "@chakra-ui/react";
import Result from "./components/Result";
import { useState } from "react";
function App() {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <Box>
        <Container maxWidth="md" mt={20}>
          <Main setInputValue={setInputValue} />
          <Result inputValue={inputValue} />
        </Container>
      </Box>
    </>
  );
}

export default App;
