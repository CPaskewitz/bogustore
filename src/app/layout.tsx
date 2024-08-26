import '../styles/global.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-beige-100">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}