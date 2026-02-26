import React, { useEffect, useState } from "react";
import {
    Box,
    VStack,
    HStack,
    Text,
    Button,
    Divider,
    Tooltip,
    IconButton,
} from "@chakra-ui/react";
import CopyToClipboard from "react-copy-to-clipboard";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const History = ({ refresh }) => {
    const [history, setHistory] = useState([]);
    const [copiedId, setCopiedId] = useState(null);

    const loadHistory = () => {
        const stored = JSON.parse(localStorage.getItem("linksnap_history") || "[]");
        setHistory(stored);
    };

    useEffect(() => {
        loadHistory();
    }, [refresh]);

    const clearHistory = () => {
        localStorage.removeItem("linksnap_history");
        setHistory([]);
    };

    const handleCopy = (id) => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (history.length === 0) return null;

    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            bg="whiteAlpha.100"
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            borderRadius="2xl"
            p={5}
            boxShadow="0 8px 32px rgba(0,0,0,0.4)"
        >
            <HStack justify="space-between" mb={4}>
                <Text
                    fontSize="sm"
                    color="whiteAlpha.600"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing={1}
                >
                    🕓 Recent Links
                </Text>
                <Button
                    id="clear-history-btn"
                    size="xs"
                    variant="ghost"
                    color="red.300"
                    _hover={{ bg: "red.900", color: "red.200" }}
                    borderRadius="lg"
                    fontFamily="'Space Grotesk', sans-serif"
                    onClick={clearHistory}
                >
                    Clear All
                </Button>
            </HStack>

            <VStack spacing={3} align="stretch">
                <AnimatePresence>
                    {history.map((item, i) => (
                        <MotionBox
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ delay: i * 0.05 }}
                            bg="whiteAlpha.50"
                            borderRadius="xl"
                            p={3}
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                        >
                            <HStack justify="space-between" wrap="wrap" gap={2}>
                                <VStack align="start" spacing={0.5} flex="1" minW="0">
                                    <Text
                                        fontSize="xs"
                                        color="whiteAlpha.400"
                                        isTruncated
                                        maxW="100%"
                                    >
                                        {item.original}
                                    </Text>
                                    <Text color="purple.300" fontWeight="600" fontSize="sm">
                                        {item.shortened}
                                    </Text>
                                    <Text fontSize="10px" color="whiteAlpha.300">
                                        {item.createdAt}
                                    </Text>
                                </VStack>
                                <HStack spacing={2}>
                                    <CopyToClipboard
                                        text={item.shortened}
                                        onCopy={() => handleCopy(item.id)}
                                    >
                                        <Button
                                            size="xs"
                                            bgGradient={
                                                copiedId === item.id
                                                    ? "linear(to-r, green.500, teal.500)"
                                                    : "linear(to-r, purple.700, blue.700)"
                                            }
                                            color="white"
                                            borderRadius="lg"
                                            _hover={{ opacity: 0.85 }}
                                            transition="all 0.2s"
                                            fontFamily="'Space Grotesk', sans-serif"
                                            minW="60px"
                                        >
                                            {copiedId === item.id ? "✓" : "Copy"}
                                        </Button>
                                    </CopyToClipboard>
                                    <Button
                                        as="a"
                                        href={item.shortened}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        size="xs"
                                        variant="outline"
                                        borderColor="whiteAlpha.200"
                                        color="whiteAlpha.700"
                                        borderRadius="lg"
                                        _hover={{ bg: "whiteAlpha.100" }}
                                        fontFamily="'Space Grotesk', sans-serif"
                                    >
                                        ↗
                                    </Button>
                                </HStack>
                            </HStack>
                        </MotionBox>
                    ))}
                </AnimatePresence>
            </VStack>
        </MotionBox>
    );
};

export default History;
