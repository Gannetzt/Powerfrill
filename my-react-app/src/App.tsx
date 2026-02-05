import './index.css'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ProductPage from './components/ProductPage'
import ProductsOverview from './components/ProductsOverview'
import CategoryDetail from './components/CategoryDetail'
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
      categoryPath={product.categoryPath}
      title={product.title}
      subtitle={product.subtitle}
      image={product.image}
      features={product.features}
      description={product.description}
      advantages={product.advantages}
      applications={product.applications}
      proTip={product.proTip}
    />
  );
}

function HomePage() {
  return (
    <>
      <main>
        <Hero />
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
          <Route path="/products" element={<ProductsOverview />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />

          {/* Generic Product Route */}
          <Route path="/product/:productId" element={<ProductPageWrapper />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App
