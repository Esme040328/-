import './globals.css';

export const metadata = {
  title: '孙丝语 - 作品集',
  description: '个人插画作品展示网站',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
