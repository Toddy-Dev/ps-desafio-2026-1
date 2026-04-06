import Banner from "./_components/banner";
import Products from "./_components/products";

export default function Home() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <Banner />
      <Products />
    </main>
  );
}