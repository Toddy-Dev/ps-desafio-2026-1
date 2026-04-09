"use client";

import { useState } from "react";
import Categories from "./_components/categories";
import Banner from "./_components/banner";
import Products from "./_components/products";
import themeStyles from "./_components/theme.module.css";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className={themeStyles.themeProvider}>
      <main style={{ padding: "2rem 0", maxWidth: "1200px", margin: "0 auto" }}>

        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <Banner />
        <Products selectedCategory={selectedCategory} />

      </main>
    </div>
  );
}