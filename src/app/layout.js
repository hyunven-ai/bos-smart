import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

export const metadata = {
  title: 'BOS SMART | Lighting & Power Solutions',
  description: 'Solusi pencahayaan dan sistem daya untuk kebutuhan komersial, industri, dan proyek. Professional Lighting, Architectural & Façade Lighting, serta Stabilizer & Transformer dari PT Berkat Optimal Semesta (BOS SMART).',
  keywords: 'lighting and power solutions, professional lighting, architectural lighting, facade lighting, stabilizer, transformer, pt berkat optimal semesta, bos smart',
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
