import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('posts', ({ data }) => {
    return data.draft !== true;
  });

  return rss({
    title: 'Personal Blog',
    description: 'A blog about web development, performance, and modern web technologies',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
        author: post.data.author,
        categories: post.data.tags,
      })),
    customData: `<language>en-us</language>`,
  });
}
