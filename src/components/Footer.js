import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
            py={6}
            px={4}
            textAlign="center"
        >
            <Text fontSize="sm" color="whiteAlpha.300" fontFamily="'Space Grotesk', sans-serif">
                <Text as="span" color="purple.400" fontWeight="600">
                    LinkSnap
                </Text>{" "}
                ·{" "}
                <Text as="span">
                    Built with ❤️ using React &amp; Chakra UI
                </Text>
            </Text>

        </Box>
    );
};

export default Footer;
