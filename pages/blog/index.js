import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function BlogHome({ posts }) {
  return (
    <Layout>
      <div className="text-center mb-16">
        <h1 className="font-display font-bold text-4xl md:text-6xl text-white">BLOG</h1>
        <p className="mt-4 text-amber-400 text-lg">活動の記録や想いを綴ります</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.slug}
            className="block p-8 rounded-2xl glass-effect transform hover:-translate-y-2 transition-transform duration-300"
          >
            <p className="text-sm text-gray-400">{post.date}</p>
            <h2 className="font-bold text-2xl text-white mt-2">{post.title}</h2>
          </Link>
        ))}
      </div>
      <style jsx global>{`
        .glass-effect {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      // ▼▼▼ Dateオブジェクトを 'YYYY-MM-DD' 形式の文字列に変換 ▼▼▼
      date: data.date.toISOString().split('T')[0],
    };
  }).sort((a, b) => (new Date(b.date) - new Date(a.date)));

  return {
    props: {
      posts,
    },
  };
}