import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { format } from 'date-fns';

import Container from '@/components/Container';
import BlogPost from '@/components/BlogPost';
import { postFilePaths, POSTS_PATH } from '@/utils/mdxUtils';
import { text } from '@/styles/text';
import { box } from '@/styles/box';

export default function Blog({ posts }) {
  return (
    <Container>
      <h1
        className={text({
          size: '7',
          weight: 'medium',
          css: { marginBottom: '$4' },
        })}
      >
        Blog
      </h1>

      <ul className={box({ listStyle: 'none', padding: 0 })}>
        {posts.map(post => {
          // fix date-fns issue assuming timezone
          const date = new Date(post.data.createdAt);
          const formattedDate = new Date(
            date.valueOf() + date.getTimezoneOffset() * 60 * 1000
          );
          return (
            <li key={post.filePath}>
              <BlogPost
                title={post.data.title}
                description={post.data.description}
                createdAt={format(formattedDate, 'PP')}
                slug={`/blog/${post.data.slug}`}
                // slug={`/blog/${post.filePath.replace(/\.mdx?$/, '')}`}
              />
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

export function getStaticProps() {
  const posts = postFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}
