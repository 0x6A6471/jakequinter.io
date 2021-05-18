import Link from 'next/link';
import { NextSeo } from 'next-seo';

import Container from '@/components/Container';
import { text } from '@/styles/text';
import { box } from '@/styles/box';
import { link } from '@/styles/link';

const Contact = () => (
  <Container>
    <NextSeo
      title="Jake Quinter 📱"
      canonical="https://jakequinter.io/contact"
      openGraph={{
        url: 'https://jakequinter.io/contact',
        title: 'Jake Quinter 📱',
      }}
    />

    <p className={text({ css: { color: '$primary' } })}>Get in touch.</p>
    <div
      className={box({
        borderLeft: '3px solid $secondary',
        marginTop: '$4',
        py: '2px',
      })}
    >
      <p className={text({ css: { marginLeft: '$3' } })}>
        <Link href="mailto:hello@jakequinter.io?subject=Hello" passHref>
          <a
            className={link({ type: 'unactive', css: { color: '$secondary' } })}
          >
            hello@jakequinter.io
          </a>
        </Link>
      </p>
    </div>
  </Container>
);

export default Contact;
