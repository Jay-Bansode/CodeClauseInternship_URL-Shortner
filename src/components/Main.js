import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  HStack,
  FormControl,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const Main = ({ setInputValue }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!value.trim()) {
      setError("Please enter a URL to shorten.");
      return;
    }
    if (!isValidUrl(value.trim())) {
      setError("Please enter a valid URL (e.g. https://example.com).");
      return;
    }
    setError("");
    setLoading(true);
    setInputValue(value.trim());
    setValue("");
    setTimeout(() => setLoading(false), 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <VStack spacing={6} textAlign="center">
        {/* Badge */}
        <Box
          display="inline-block"
          bg="whiteAlpha.100"
          border="1px solid"
          borderColor="whiteAlpha.300"
          borderRadius="full"
          px={4}
          py={1}
          backdropFilter="blur(8px)"
        >
          <Text fontSize="xs" color="purple.200" fontWeight="600" letterSpacing={2} textTransform="uppercase">
            ⚡ Fast · Free · Reliable
          </Text>
        </Box>

        {/* Heading */}
        <Box>
          <Text
            as="h1"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="800"
            bgGradient="linear(to-r, #a78bfa, #818cf8, #38bdf8)"
            bgClip="text"
            lineHeight="1.1"
            letterSpacing="-1px"
          >
            LinkSnap
          </Text>
          <Text
            fontSize={{ base: "md", md: "xl" }}
            color="whiteAlpha.700"
            mt={2}
            fontWeight="400"
          >
            Shorten any link in one click. Share it anywhere.
          </Text>
        </Box>

        {/* Input Card */}
        <Box
          w="100%"
          bg="whiteAlpha.100"
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor="whiteAlpha.200"
          borderRadius="2xl"
          p={{ base: 4, md: 6 }}
          boxShadow="0 8px 32px rgba(0,0,0,0.4)"
        >
          <FormControl isInvalid={!!error}>
            <HStack spacing={3}>
              <Input
                id="url-input"
                type="text"
                placeholder="Paste your long URL here..."
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={handleKeyDown}
                size="lg"
                bg="whiteAlpha.100"
                border="1px solid"
                borderColor="whiteAlpha.300"
                color="white"
                _placeholder={{ color: "whiteAlpha.400" }}
                _focus={{
                  borderColor: "purple.400",
                  boxShadow: "0 0 0 1px #a78bfa",
                  bg: "whiteAlpha.200",
                }}
                _hover={{ borderColor: "whiteAlpha.400" }}
                borderRadius="xl"
                fontFamily="'Space Grotesk', sans-serif"
              />
              <Button
                id="shorten-btn"
                size="lg"
                bgGradient="linear(to-r, purple.500, blue.500)"
                color="white"
                _hover={{ bgGradient: "linear(to-r, purple.400, blue.400)", transform: "translateY(-1px)" }}
                _active={{ transform: "translateY(0)" }}
                transition="all 0.2s"
                borderRadius="xl"
                fontWeight="700"
                px={8}
                minW="120px"
                onClick={handleSubmit}
                isLoading={loading}
                spinner={<Spinner size="sm" />}
                loadingText="Shortening"
                fontFamily="'Space Grotesk', sans-serif"
                boxShadow="0 4px 15px rgba(139,92,246,0.4)"
              >
                Shorten
              </Button>
            </HStack>
            {error && (
              <FormErrorMessage color="red.300" mt={2} fontSize="sm">
                {error}
              </FormErrorMessage>
            )}
          </FormControl>
        </Box>
      </VStack>
    </MotionBox>
  );
};

export default Main;
