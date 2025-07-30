// components/Layout.js

import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-gray-300 font-sans">
      <Head>
        <title>まさやん | 皿回しブログ</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Noto+Sans+JP:wght@400;700&display=swap" />
        <style>{`
          body { font-family: 'Noto Sans JP', 'Inter', sans-serif; }
          .font-display { font-family: 'Inter', sans-serif; }
        `}</style>
      </Head>

      <header className="py-4 border-b border-gray-800">
        <div className="container mx-auto px-6 flex justify-between items-center">
            <Link href="/">
                <a className="font-display font-bold text-xl text-white">まさやん | 皿回し</a>
            </Link>
            <Link href="/blog">
                <a className="text-gray-300 hover:text-white transition-colors duration-300">ブログ一覧へ</a>
            </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {children}
      </main>

      <footer className="bg-black py-8 mt-16">
        <div className="container mx-auto px-6 text-center text-gray-500">
            <p>&copy; 2024 Masayuki Furuya (Masayan) Plate Spinning. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}