'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="h-screen flex flex-col items-center justify-center text-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-light mb-6">孙丝语</h1>
          <h2 className="text-2xl md:text-3xl font-extralight mb-12">SUN SIYU</h2>
          <p className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
            产品设计师，专注于创作优雅而富有意义的插画和视觉设计作品。
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/portfolio" className="inline-block border border-black px-8 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
              浏览作品
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl mb-8 font-light">精选作品</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-square bg-gray-200"></div>
            <div className="aspect-square bg-gray-200"></div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/portfolio" className="text-sm uppercase tracking-widest border-b border-black pb-1 hover:border-gray-400 transition-colors">
              查看全部作品
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
