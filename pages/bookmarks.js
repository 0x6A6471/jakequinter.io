import Head from 'next/head';
import { NextSeo } from 'next-seo';
import {
  Box,
  Flex,
  Heading,
  Icon,
  ListItem,
  Stack,
  Text
} from '@chakra-ui/core';

import Container from '@/components/Container';
import Things from '@/components/Things';

const ResumeItem = ({ content, children }) => {
  return (
    <ListItem color="#484848" width={['100%', '80%']}>
      <Stack ml={2} pb={3}>
        <Flex align="center">
          <Icon name="chevron-right" mr={2} />
          <Text>{content}</Text>
        </Flex>
        <Text color="#d8d8d8" ml={6}>
          {children}
        </Text>
      </Stack>
    </ListItem>
  );
};

const Resume = () => (
  <Container>
    <NextSeo
      title="Jake Quinter 📌"
      canonical="https://jakequinter.io/bookmarks"
      openGraph={{
        url: 'https://jakequinter.io/bookmarks',
        title: 'Jake Quinter 📌'
      }}
    />
    <div className="flex-row justify-between align-center">
      <h1 as="h1" size="xl" color="#333">
        Internet Things
      </h1>
      <div>
        <p className="pt-4">
          This page is going to be a collection of “internet things” that I feel
          are exceptional and want to save for future reference. These "internet
          things" are going to range from personal websites I admire, people who
          I believe are worth following, books I believe are worth reading,
          podcasts that deserve a listen, blogs worth reading, musings, and who
          knows what else.
        </p>
        <Things />
      </div>
    </div>
  </Container>
);

export default Resume;
