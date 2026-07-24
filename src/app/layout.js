import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

export const metadata = {
  title: 'BOS SMART - Smart Living Starts Here',
  description: 'Solusi perangkat Smart Home, Kitchen & Living modern, dan pasokan Electrical Supply premium dari PT Berkat Optimal Semesta (BOS SMART).',
  keywords: 'smart home, kitchen living, electrical supply, stabilizer, tuya, smart socket, cikarang, bekasi, pt berkat optimal semesta',
  icons: {
    icon: 'https://res.cloudinary.com/dzojrrwtr/image/upload/v1784899130/favicon_dsvhsa.png',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
