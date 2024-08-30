'use client';

import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className="bg-beige-100">
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
}