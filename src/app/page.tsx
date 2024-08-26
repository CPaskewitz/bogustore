import ProductList from '../components/ProductList';
import Promotion from '../components/Promotion';
import CategoryList from '../components/CategoryList';

export default function Home() {
  return (
    <main className="p-8 bg-beige-100 min-h-screen">
      <Promotion />
      <CategoryList />
      <ProductList />
    </main>
  );
}