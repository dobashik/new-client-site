import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Layout from '../../components/Layout';

export default function Post({ postData }) {
  return (
    <Layout>
      <article className="max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">{postData.title}</h1>
        <p className="text-gray-400 mb-8">{postData.date}</p>
        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>
      <style jsx global>{`
        .prose { color: #d1d5db; }
        .prose h1, .prose h2, .prose h3 { color: #ffffff; }
        .prose a { color: #f59e0b; }
        .prose blockquote { border-left-color: #6b7280; }
        .prose strong { color: #ffffff; }
      `}</style>
    </Layout>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  const paths = filenames.map(filename => ({
    params: {
      slug: filename.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      postData: {
        title: data.title,
        // ▼▼▼ こちらも同様に、Dateオブジェクトを文字列に変換 ▼▼▼
        date: data.date.toISOString().split('T')[0],
        contentHtml,
      },
    },
  };
}