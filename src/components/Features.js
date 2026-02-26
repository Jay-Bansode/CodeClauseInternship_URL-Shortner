import React from "react";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const features = [
    {
        icon: "⚡",
        title: "Blazing Fast",
        desc: "Links shorten in milliseconds. No wait, no friction.",
    },
    {
        icon: "🔒",
        title: "Secure & Safe",
        desc: "All links are validated and safe to share anywhere.",
    },
    {
        icon: "🆓",
        title: "Always Free",
        desc: "No account needed. Just paste, shorten, and share.",
    },
];

const Features = () => {
    return (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {features.map((f, i) => (
                <MotionBox
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    bg="whiteAlpha.50"
                    backdropFilter="blur(12px)"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    borderRadius="2xl"
                    p={5}
                    textAlign="center"
                    _hover={{
                        bg: "whiteAlpha.100",
                        borderColor: "purple.600",
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 30px rgba(139,92,246,0.2)",
                    }}
                    cursor="default"
                >
                    <VStack spacing={2}>
                        <Text fontSize="3xl">{f.icon}</Text>
                        <Text fontWeight="700" color="white" fontSize="md">
                            {f.title}
                        </Text>
                        <Text fontSize="sm" color="whiteAlpha.500" lineHeight="1.6">
                            {f.desc}
                        </Text>
                    </VStack>
                </MotionBox>
            ))}
        </SimpleGrid>
    );
};

export default Features;
