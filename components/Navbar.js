import React from 'react';
import NextLink from 'next/link';
import { Box, Button, Flex, Image } from '@chakra-ui/core';

const DashboardShell = ({ children }) => {
  return (
    <Flex flexDirection="column" color="#484848">
      <Flex
        margin="0 auto"
        w={{ xs: '100%', md: '70%' }}
        maxWidth="1500px"
        alignItems="center"
        justifyContent="space-between"
        py={4}
        px={8}
      >
        <NextLink href="/">
          <Image
            src="/logo.png"
            alt="Jake Quinter"
            maxH="50px"
            cursor="pointer"
          />
        </NextLink>
        <Box>
          <NextLink href="/about" passHref>
            <Button as="a" size="sm" variant="ghost" p={[1, 4]}>
              ABOUT
            </Button>
          </NextLink>
          <NextLink href="/bookmarks" passHref>
            <Button as="a" size="sm" variant="ghost" p={[1, 4]}>
              BOOKMARKS
            </Button>
          </NextLink>
          <NextLink href="/contact" passHref>
            <Button as="a" size="sm" variant="ghost" p={[1, 4]}>
              CONTACT
            </Button>
          </NextLink>
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
