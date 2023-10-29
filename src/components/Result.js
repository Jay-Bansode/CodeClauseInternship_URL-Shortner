import { Button, HStack, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const Result = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://is.gd/create.php?format=json&url=${inputValue}`
      );

      // console.log(res.data.shorturl);
      setShortenLink(res.data.shorturl);
    } catch (error) {
      alert("Plesae enter a valid link");
      setError(error);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      getData();
    }
  }, [inputValue]);

  if (error) {
    return (
      <Heading as="h1" color="red" textAlign="center">
        Something Went Wrong
      </Heading>
    );
  }
  return (
    <>
      {shortenLink && (
        <HStack marginLeft={12}>
          <Text borderRadius={2} border="1px" padding={2}>
            {shortenLink}
          </Text>
          <CopyToClipboard text={shortenLink}>
            <Button colorScheme="yellow">Copy to Clipboard</Button>
          </CopyToClipboard>
        </HStack>
      )}
    </>
  );
};

export default Result;
