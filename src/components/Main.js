import React, { useState } from "react";
import { Heading, HStack, Input, Button, Spacer } from "@chakra-ui/react";

const Main = ({ setInputValue }) => {
  const [value, setValue] = useState("");

  const SubmitHandler = () => {
    if (!value.length) {
      alert("enter something");
    }
    setInputValue(value);
    setValue("");
  };
  return (
    <>
      <Heading textAlign="center" letterSpacing={2}>
        URL Shortner
      </Heading>
      <Spacer h={5} />
      <HStack>
        <Input
          type="text"
          variant="outline"
          size="md"
          placeholder="Enter a link to shorten"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button colorScheme="yellow" onClick={SubmitHandler}>
          Shorten
        </Button>
      </HStack>
      <Spacer h={5} />
    </>
  );
};
export default Main;
