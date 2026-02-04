import './index.css'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import ProductPage from './components/ProductPage'
import { getProductById } from './data/products'

function ProductPageWrapper() {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : undefined;

  if (!product) {
    return (
      <div className="product-page" style={{ textAlign: 'center', paddingTop: '200px' }}>
        <h1 style={{ color: '#ffffff' }}>Product Not Found</h1>
        <a href="/" style={{ color: '#3b82f6' }}>← Back to Home</a>
      </div>
    );
  }

  return (
    <ProductPage
      category={product.category}
      categoryPath={product.categoryPath}
      title={product.title}
      subtitle={product.subtitle}
      image={product.image}
      features={product.features}
      description={product.description}
    />
  );
}

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductPageWrapper />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
