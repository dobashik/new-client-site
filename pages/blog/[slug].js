import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Layout from '../../components/Layout'; // 共通レイアウトを読み込む

// --------------------------------------------------------
// ページの見た目を定義する部分
// --------------------------------------------------------
export default function Post({ postData }) {
  return (
    <Layout>
      <article className="max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">{postData.title}</h1>
        <p className="text-gray-400 mb-8">{postData.date}</p>
        
        {/* 本文を表示するエリア */}
        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>

      {/* Tailwind Typographyの簡易スタイル */}
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

// --------------------------------------------------------
// ここからが、省略していた部分です
// --------------------------------------------------------

/**
 * どのブログページのURLを作るかをNext.jsに教えるための関数
 */
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

/**
 * 特定の１つのブログ記事のデータを取得するための関数
 */
export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // ファイルの情報を分解する
  const { data, content } = matter(fileContents);

  // MarkdownをHTMLに変換する
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // ページにデータを渡す
  return {
    props: {
      postData: {
        title: data.title,
        date: data.date,
        contentHtml,
      },
    },
  };
}