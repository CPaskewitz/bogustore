import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Promotion from "@/components/Promotion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-beige-100">
      <Promotion />
      <CategoryList />
      <ProductList />
   </main>
  );
}