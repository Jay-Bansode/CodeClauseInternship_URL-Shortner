import React, { useEffect, useState } from "react";
import { Box, Text, HStack, Button, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const saveToHistory = (original, shortened) => {
  const history = JSON.parse(localStorage.getItem("linksnap_history") || "[]");
  const entry = {
    id: Date.now(),
    original,
    shortened,
    createdAt: new Date().toLocaleString(),
  };
  const updated = [entry, ...history].slice(0, 10);
  localStorage.setItem("linksnap_history", JSON.stringify(updated));
};

const Result = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const getData = React.useCallback(async () => {
    if (!inputValue) return;
    setError("");
    setShortenLink("");
    try {
      const res = await axios.get(
        `https://is.gd/create.php?format=json&url=${encodeURIComponent(inputValue)}`
      );
      setShortenLink(res.data.shorturl);
      saveToHistory(inputValue, res.data.shorturl);
    } catch (err) {
      setError("Failed to shorten the URL. Please check the link and try again.");
    }
  }, [inputValue]);

  useEffect(() => {
    if (inputValue?.length) {
      getData();
    }
  }, [inputValue, getData]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error) {
    return (
      <AnimatePresence>
        <MotionBox
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          bg="red.900"
          border="1px solid"
          borderColor="red.500"
          borderRadius="2xl"
          p={5}
          textAlign="center"
        >
          <Text color="red.200" fontWeight="500" fontSize="sm">
            ⚠️ {error}
          </Text>
        </MotionBox>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {shortenLink && (
        <MotionBox
          key={shortenLink}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          bg="whiteAlpha.100"
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor="whiteAlpha.200"
          borderRadius="2xl"
          p={5}
          boxShadow="0 8px 32px rgba(0,0,0,0.4)"
        >
          <Text fontSize="xs" color="whiteAlpha.500" fontWeight="600" textTransform="uppercase" letterSpacing={1} mb={3}>
            ✅ Your Shortened Link
          </Text>
          <HStack justify="space-between" wrap="wrap" gap={3}>
            <Box flex="1" minW="0">
              <Text
                color="purple.200"
                fontWeight="600"
                fontSize="lg"
                isTruncated
                bg="whiteAlpha.100"
                borderRadius="lg"
                px={4}
                py={2}
                border="1px solid"
                borderColor="purple.700"
              >
                {shortenLink}
              </Text>
            </Box>
            <HStack spacing={2}>
              <CopyToClipboard text={shortenLink} onCopy={handleCopy}>
                <Button
                  id="copy-btn"
                  size="md"
                  bgGradient={copied ? "linear(to-r, green.500, teal.500)" : "linear(to-r, purple.600, blue.600)"}
                  color="white"
                  _hover={{ opacity: 0.9, transform: "translateY(-1px)" }}
                  transition="all 0.2s"
                  borderRadius="xl"
                  fontWeight="600"
                  fontFamily="'Space Grotesk', sans-serif"
                  minW="120px"
                >
                  {copied ? "✓ Copied!" : "Copy Link"}
                </Button>
              </CopyToClipboard>
              <Tooltip label="Open in new tab" hasArrow placement="top">
                <Button
                  id="open-btn"
                  as="a"
                  href={shortenLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  color="whiteAlpha.800"
                  _hover={{ bg: "whiteAlpha.100", transform: "translateY(-1px)" }}
                  transition="all 0.2s"
                  borderRadius="xl"
                  fontFamily="'Space Grotesk', sans-serif"
                >
                  Open ↗
                </Button>
              </Tooltip>
            </HStack>
          </HStack>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default Result;
