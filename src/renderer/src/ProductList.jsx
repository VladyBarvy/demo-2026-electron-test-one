// ProductList.jsx
// import { useState, useEffect } from 'react';
// import './styles/ProductList.css';

// function ProductList({ userRole = 'guest', userName = 'Гость' }) {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('name');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   useEffect(() => {
//     filterAndSortProducts();
//   }, [products, searchTerm, sortBy, sortOrder, selectedCategory]);

//   const loadProducts = async () => {
//     try {
//       const productsData = await window.api.getProducts();
//       setProducts(productsData);
//     } catch (error) {
//       console.error('Ошибка загрузки товаров:', error);
//     }
//   };

//   const filterAndSortProducts = () => {
//     let filtered = products.filter(product => {
//       const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     });

//     filtered.sort((a, b) => {
//       let valueA = a[sortBy];
//       let valueB = b[sortBy];

//       if (sortBy === 'price' || sortBy === 'discount' || sortBy === 'stock_quantity') {
//         valueA = Number(valueA);
//         valueB = Number(valueB);
//       }

//       if (sortOrder === 'asc') {
//         return valueA > valueB ? 1 : -1;
//       } else {
//         return valueA < valueB ? 1 : -1;
//       }
//     });

//     setFilteredProducts(filtered);
//   };

//   const getCategories = () => {
//     const categories = [...new Set(products.map(product => product.category))];
//     return categories;
//   };

//   const calculateFinalPrice = (price, discount) => {
//     return price * (1 - discount / 100);
//   };

//   const getRowClassName = (product) => {
//     let className = 'product-row';
    
//     if (product.discount > 15) {
//       className += ' high-discount';
//     }
    
//     if (product.stock_quantity === 0) {
//       className += ' out-of-stock';
//     }
    
//     return className;
//   };

//   return (
//     <div className="product-list-container">
//       <div className="product-header">
//         <h1>КАТАЛОГ ТОВАРОВ</h1>
//         <div className="user-info">
//           <span>Пользователь: {userName}</span>
//           <span>Роль: {userRole}</span>
//         </div>
//       </div>

//       <div className="controls">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Поиск по названию, категории, описанию..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className="filters">
//           <select 
//             value={selectedCategory} 
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="all">Все категории</option>
//             {getCategories().map(category => (
//               <option key={category} value={category}>{category}</option>
//             ))}
//           </select>

//           <select 
//             value={sortBy} 
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="name">По названию</option>
//             <option value="price">По цене</option>
//             <option value="category">По категории</option>
//             <option value="stock_quantity">По количеству</option>
//           </select>

//           <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
//             {sortOrder === 'asc' ? '↑' : '↓'}
//           </button>
//         </div>
//       </div>

//       <div className="products-grid">
//         {filteredProducts.map(product => (
//           <div key={product.id} className={getRowClassName(product)}>
//             <div className="product-image">
//               <img 
//                 src={product.photo_url || '/picture.png'} 
//                 alt={product.name}
//                 onError={(e) => {
//                   e.target.src = '/picture.png';
//                 }}
//               />
//             </div>
            
//             <div className="product-info">
//               <h3 className="product-category">{product.category}</h3>
//               <h2 className="product-name">{product.name}</h2>
              
//               <div className="product-description">
//                 <p>{product.description}</p>
//               </div>

//               <div className="product-details">
//                 <p><strong>Производитель:</strong> {product.manufacturer}</p>
//                 <p><strong>Поставщик:</strong> {product.supplier}</p>
//                 <p><strong>Единица измерения:</strong> {product.unit}</p>
//                 <p><strong>Количество на складе:</strong> {product.stock_quantity}</p>
//               </div>

//               <div className="product-price">
//                 {product.discount > 0 ? (
//                   <>
//                     <span className="original-price crossed">{product.price} ₽</span>
//                     <span className="final-price">
//                       {calculateFinalPrice(product.price, product.discount).toFixed(2)} ₽
//                     </span>
//                     <span className="discount-badge">-{product.discount}%</span>
//                   </>
//                 ) : (
//                   <span className="final-price">{product.price} ₽</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredProducts.length === 0 && (
//         <div className="no-products">
//           <p>Товары не найдены</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductList;











///////////////////////////////////////////////////////////////////////////////140925-111
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import './styles/ProductList.css';

// // Выносим тяжелые функции вне компонента для оптимизации
// const calculateFinalPrice = (price, discount) => {
//   const numericPrice = Number(price) || 0;
//   const numericDiscount = Number(discount) || 0;
//   return numericPrice * (1 - numericDiscount / 100);
// };

// const getRowClassName = (product) => {
//   let className = 'product-row';
  
//   const discount = Number(product.discount) || 0;
//   const stockQuantity = Number(product.stock_quantity) || 0;
  
//   if (discount > 15) {
//     className += ' high-discount';
//   }
  
//   if (stockQuantity === 0) {
//     className += ' out-of-stock';
//   }
  
//   return className;
// };

// // Memoized компонент карточки товара
// const ProductCard = React.memo(({ product }) => {
//   return (
//     <div className={getRowClassName(product)}>
//       <div className="product-image">
//         <img 
//           src={product.photo_url || '/picture.png'} 
//           alt={product.name}
//           onError={(e) => {
//             e.target.src = '/picture.png';
//           }}
//         />
//       </div>
      
//       <div className="product-info">
//         <h3 className="product-category">{product.category || 'Без категории'}</h3>
//         <h2 className="product-name">{product.name}</h2>
        
//         {product.description && (
//           <div className="product-description">
//             <p>{product.description}</p>
//           </div>
//         )}

//         <div className="product-details">
//           <p><strong>Артикул:</strong> {product.article}</p>
//           <p><strong>Производитель:</strong> {product.manufacturer || 'Не указан'}</p>
//           <p><strong>Поставщик:</strong> {product.supplier || 'Не указан'}</p>
//           <p><strong>Единица измерения:</strong> {product.unit || 'шт.'}</p>
//           <p><strong>Количество на складе:</strong> {product.stock_quantity}</p>
//         </div>

//         <div className="product-price">
//           {product.discount > 0 ? (
//             <>
//               <span className="original-price crossed">{Number(product.price).toFixed(2)} ₽</span>
//               <span className="final-price">
//                 {calculateFinalPrice(product.price, product.discount).toFixed(2)} ₽
//               </span>
//               <span className="discount-badge">-{product.discount}%</span>
//             </>
//           ) : (
//             <span className="final-price">{Number(product.price).toFixed(2)} ₽</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// });

// ProductCard.displayName = 'ProductCard';

// function ProductList({ user = null, onLogout = null, showFilters = true }) {
//   const [products, setProducts] = useState([]);
//   const [searchValue, setSearchValue] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('name');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Загрузка товаров один раз при монтировании
//   const loadProducts = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log('Загрузка товаров...');
      
//       if (window.api && typeof window.api.getProducts === 'function') {
//         const productsData = await window.api.getProducts();
//         console.log('Товары загружены:', productsData.length);
//         setProducts(productsData || []);
//       } else {
//         throw new Error('API не доступно');
//       }
//     } catch (error) {
//       console.error('Ошибка загрузки товаров:', error);
//       setError(error.message);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadProducts();
//   }, [loadProducts]);

//   // Debounce для поиска
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setSearchTerm(searchValue);
//     }, 150);

//     return () => clearTimeout(timer);
//   }, [searchValue]);

//   // Memoized категории
//   const categories = useMemo(() => {
//     return ['all', ...new Set(products.map(product => product.category).filter(Boolean))];
//   }, [products]);

//   // Memoized отфильтрованные и отсортированные товары
//   const filteredProducts = useMemo(() => {
//     if (products.length === 0) return [];

//     let filtered = products.filter(product => {
//       const matchesSearch = 
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
//       const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
//       return matchesSearch && matchesCategory;
//     });

//     // Сортировка
//     return filtered.sort((a, b) => {
//       let valueA = a[sortBy];
//       let valueB = b[sortBy];

//       if (sortBy === 'price' || sortBy === 'discount' || sortBy === 'stock_quantity') {
//         valueA = Number(valueA) || 0;
//         valueB = Number(valueB) || 0;
//       }

//       if (typeof valueA === 'string') valueA = valueA.toLowerCase();
//       if (typeof valueB === 'string') valueB = valueB.toLowerCase();

//       if (sortOrder === 'asc') {
//         return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
//       } else {
//         return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
//       }
//     });
//   }, [products, searchTerm, sortBy, sortOrder, selectedCategory]);

//   const handleSearchChange = useCallback((e) => {
//     setSearchValue(e.target.value);
//   }, []);

//   const handleCategoryChange = useCallback((e) => {
//     setSelectedCategory(e.target.value);
//   }, []);

//   const handleSortChange = useCallback((e) => {
//     setSortBy(e.target.value);
//   }, []);

//   const handleSortOrderToggle = useCallback(() => {
//     setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
//   }, []);

//   if (loading) {
//     return (
//       <div className="product-list-container">
//         <Header user={user} onLogout={onLogout} />
//         <div className="loading">Загрузка товаров...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="product-list-container">
//       <Header user={user} onLogout={onLogout} />
      
//       {showFilters && (
//         <Filters
//           searchValue={searchValue}
//           onSearchChange={handleSearchChange}
//           selectedCategory={selectedCategory}
//           onCategoryChange={handleCategoryChange}
//           sortBy={sortBy}
//           onSortChange={handleSortChange}
//           sortOrder={sortOrder}
//           onSortOrderToggle={handleSortOrderToggle}
//           categories={categories}
//         />
//       )}

//       {error && (
//         <div className="error">
//           <p>Ошибка загрузки: {error}</p>
//           <p>Используются демонстрационные данные</p>
//         </div>
//       )}

//       <ProductsGrid products={filteredProducts} />
      
//       {filteredProducts.length === 0 && products.length > 0 && (
//         <div className="no-products">
//           <p>Товары не найдены по вашему запросу</p>
//         </div>
//       )}

//       {products.length === 0 && !loading && (
//         <div className="no-products">
//           <p>Товары отсутствуют</p>
//         </div>
//       )}
//     </div>
//   );
// }

// // Выносим компоненты для оптимизации
// const Header = React.memo(({ user, onLogout }) => (
//   <div className="product-header">
//     <h1>КАТАЛОГ ТОВАРОВ</h1>
//     <div className="user-info">
//       <span>Пользователь: {user ? user.full_name : 'Гость'}</span>
//       <span>Роль: {user ? user.role : 'Гость'}</span>
//       {user && <button onClick={onLogout}>Выйти</button>}
//     </div>
//   </div>
// ));

// Header.displayName = 'Header';

// const Filters = React.memo(({
//   searchValue,
//   onSearchChange,
//   selectedCategory,
//   onCategoryChange,
//   sortBy,
//   onSortChange,
//   sortOrder,
//   onSortOrderToggle,
//   categories
// }) => (
//   <div className="controls">
//     <div className="search-box">
//       <input
//         type="text"
//         placeholder="Поиск по названию, категории, описанию..."
//         value={searchValue}
//         onChange={onSearchChange}
//       />
//     </div>

//     <div className="filters">
//       <select 
//         value={selectedCategory} 
//         onChange={onCategoryChange}
//       >
//         <option value="all">Все категории</option>
//         {categories.filter(cat => cat !== 'all').map(category => (
//           <option key={category} value={category}>{category}</option>
//         ))}
//       </select>

//       <select 
//         value={sortBy} 
//         onChange={onSortChange}
//       >
//         <option value="name">По названию</option>
//         <option value="price">По цене</option>
//         <option value="category">По категории</option>
//         <option value="stock_quantity">По количеству</option>
//         <option value="discount">По скидке</option>
//       </select>

//       <button onClick={onSortOrderToggle}>
//         {sortOrder === 'asc' ? '↑' : '↓'}
//       </button>
//     </div>
//   </div>
// ));

// Filters.displayName = 'Filters';

// const ProductsGrid = React.memo(({ products }) => (
//   <div className="products-grid">
//     {products.map(product => (
//       <ProductCard key={product.id} product={product} />
//     ))}
//   </div>
// ));

// ProductsGrid.displayName = 'ProductsGrid';

// export default ProductList;










import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import './styles/ProductList.css';

// Глобальная переменная для подсчета рендеров
let renderCount = 0;
let effectCount = 0;

// Выносим тяжелые функции вне компонента для оптимизации
const calculateFinalPrice = (price, discount) => {
  const numericPrice = Number(price) || 0;
  const numericDiscount = Number(discount) || 0;
  return numericPrice * (1 - numericDiscount / 100);
};

const getRowClassName = (product) => {
  let className = 'product-row';
  
  const discount = Number(product.discount) || 0;
  const stockQuantity = Number(product.stock_quantity) || 0;
  
  if (discount > 15) {
    className += ' high-discount';
  }
  
  if (stockQuantity === 0) {
    className += ' out-of-stock';
  }
  
  return className;
};

// Memoized компонент карточки товара
const ProductCard = React.memo(({ product }) => {
  const cardRenderCount = React.useRef(0);
  cardRenderCount.current++;
  
  console.log(`🔄 ProductCard ${product.id} render: ${cardRenderCount.current}`);
  
  return (
    <div className={getRowClassName(product)}>
      <div className="product-image">
        <img 
          src={product.photo_url || '/picture.png'} 
          alt={product.name}
          onError={(e) => {
            e.target.src = '/picture.png';
          }}
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-category">{product.category || 'Без категории'}</h3>
        <h2 className="product-name">{product.name}</h2>
        
        {product.description && (
          <div className="product-description">
            <p>{product.description}</p>
          </div>
        )}

        <div className="product-details">
          <p><strong>Артикул:</strong> {product.article}</p>
          <p><strong>Производитель:</strong> {product.manufacturer || 'Не указан'}</p>
          <p><strong>Поставщик:</strong> {product.supplier || 'Не указан'}</p>
          <p><strong>Единица измерения:</strong> {product.unit || 'шт.'}</p>
          <p><strong>Количество на складе:</strong> {product.stock_quantity}</p>
        </div>

        <div className="product-price">
          {product.discount > 0 ? (
            <>
              <span className="original-price crossed">{Number(product.price).toFixed(2)} ₽</span>
              <span className="final-price">
                {calculateFinalPrice(product.price, product.discount).toFixed(2)} ₽
              </span>
              <span className="discount-badge">-{product.discount}%</span>
            </>
          ) : (
            <span className="final-price">{Number(product.price).toFixed(2)} ₽</span>
          )}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения для React.memo
  const isEqual = prevProps.product.id === nextProps.product.id &&
                 prevProps.product.name === nextProps.product.name &&
                 prevProps.product.price === nextProps.product.price &&
                 prevProps.product.discount === nextProps.product.discount &&
                 prevProps.product.stock_quantity === nextProps.product.stock_quantity;
  
  console.log(`🔍 ProductCard ${prevProps.product.id} shouldUpdate: ${!isEqual}`);
  return isEqual;
});

ProductCard.displayName = 'ProductCard';

function ProductList({ user = null, onLogout = null, showFilters = true }) {
  renderCount++;
  console.log(`🎯 ProductList render: ${renderCount}`);
  
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Логируем изменения состояний
  useEffect(() => {
    effectCount++;
    console.log(`📊 State changed - renderCount: ${renderCount}, effectCount: ${effectCount}`);
    console.log(`   products: ${products.length}, loading: ${loading}, error: ${error}`);
    console.log(`   search: "${searchValue}", category: ${selectedCategory}, sort: ${sortBy}/${sortOrder}`);
  });

  // Загрузка товаров один раз при монтировании
  // const loadProducts = useCallback(async () => {
  //   try {
  //     console.log('🚀 Starting loadProducts');
  //     setLoading(true);
      
  //     if (window.api && typeof window.api.getProducts === 'function') {
  //       console.log('📞 Calling window.api.getProducts()');
  //       const productsData = await window.api.getProducts();
  //       console.log('✅ Products loaded:', productsData.length);
  //       setProducts(productsData || []);
  //     } else {
  //       console.warn('❌ API not available');
  //       throw new Error('API не доступно');
  //     }
  //   } catch (error) {
  //     console.error('❌ Error loading products:', error);
  //     setError(error.message);
  //     setProducts([]);
  //   } finally {
  //     console.log('🏁 loadProducts finished');
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log('⚡ useEffect - loadProducts');
  //   loadProducts();
  // }, [loadProducts]);



  const loadProducts = useCallback(async () => {
    try {
      console.log('🚀 Starting loadProducts');
      setLoading(true);
      
      if (window.api && typeof window.api.getProducts === 'function') {
        console.log('📞 Calling window.api.getProducts()');
        const productsData = await window.api.getProducts();
        console.log('✅ Products loaded:', productsData.length);
        setProducts(productsData || []);
      } else {
        console.warn('❌ API not available');
        throw new Error('API не доступно');
      }
    } catch (error) {
      console.error('❌ Error loading products:', error);
      setError(error.message);
      setProducts([]);
    } finally {
      console.log('🏁 loadProducts finished');
      setLoading(false);
    }
  // Добавьте стабильные зависимости
  }, [setLoading, setProducts, setError]);


  useEffect(() => {
    console.log('⚡ useEffect - loadProducts (mount only)');
    loadProducts();
    // Пустой массив зависимостей - выполнится только при монтировании
  }, []);


  // Debounce для поиска
  useEffect(() => {
    console.log(`🔍 Search value changed: "${searchValue}"`);
    const timer = setTimeout(() => {
      console.log(`⏰ Setting search term: "${searchValue}"`);
      setSearchTerm(searchValue);
    }, 150);

    return () => {
      console.log('🧹 Cleaning up search timer');
      clearTimeout(timer);
    };
  }, [searchValue]);



  const hasLoaded = useRef(false);

useEffect(() => {
  if (!hasLoaded.current) {
    console.log('⚡ useEffect - loadProducts (first time)');
    loadProducts();
    hasLoaded.current = true;
  }
}, [loadProducts]);


  // Memoized категории
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(products.map(product => product.category).filter(Boolean))];
    console.log(`📋 Categories computed: ${cats.join(', ')}`);
    return cats;
  }, [products]);

  // Memoized отфильтрованные и отсортированные товары
  const filteredProducts = useMemo(() => {
    console.log(`🔄 Computing filteredProducts (products: ${products.length}, search: "${searchTerm}", category: ${selectedCategory}, sort: ${sortBy}/${sortOrder})`);
    
    if (products.length === 0) {
      console.log('📭 No products to filter');
      return [];
    }

    let filtered = products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    console.log(`🔍 Filtered from ${products.length} to ${filtered.length} products`);

    // Сортировка
    const sorted = filtered.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];

      if (sortBy === 'price' || sortBy === 'discount' || sortBy === 'stock_quantity') {
        valueA = Number(valueA) || 0;
        valueB = Number(valueB) || 0;
      }

      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });

    return sorted;
  }, [products, searchTerm, sortBy, sortOrder, selectedCategory]);

  const handleSearchChange = useCallback((e) => {
    console.log(`⌨️ Search input: ${e.target.value}`);
    setSearchValue(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    console.log(`📁 Category changed: ${e.target.value}`);
    setSelectedCategory(e.target.value);
  }, []);

  const handleSortChange = useCallback((e) => {
    console.log(`📊 Sort by changed: ${e.target.value}`);
    setSortBy(e.target.value);
  }, []);

  const handleSortOrderToggle = useCallback(() => {
    console.log(`🔄 Sort order toggled: ${sortOrder} -> ${sortOrder === 'asc' ? 'desc' : 'asc'}`);
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, [sortOrder]);

  console.log(`📦 Rendering with ${filteredProducts.length} filtered products`);

  if (loading) {
    console.log('⏳ Rendering loading state');
    return (
      <div className="product-list-container">
        <Header user={user} onLogout={onLogout} />
        <div className="loading">Загрузка товаров...</div>
      </div>
    );
  }

  console.log('🎨 Rendering main content');
  return (
    <div className="product-list-container">
      <Header user={user} onLogout={onLogout} />
      
      {showFilters && (
        <Filters
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          sortOrder={sortOrder}
          onSortOrderToggle={handleSortOrderToggle}
          categories={categories}
        />
      )}

      {error && (
        <div className="error">
          <p>Ошибка загрузки: {error}</p>
          <p>Используются демонстрационные данные</p>
        </div>
      )}

      <ProductsGrid products={filteredProducts} />
      
      {filteredProducts.length === 0 && products.length > 0 && (
        <div className="no-products">
          <p>Товары не найдены по вашему запросу</p>
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="no-products">
          <p>Товары отсутствуют</p>
        </div>
      )}
    </div>
  );
}

// Выносим компоненты для оптимизации
const Header = React.memo(({ user, onLogout }) => {
  const headerRenderCount = React.useRef(0);
  headerRenderCount.current++;
  
  console.log(`🏷️ Header render: ${headerRenderCount.current}`);
  
  return (
    <div className="product-header">
      <h1>КАТАЛОГ ТОВАРОВ</h1>
      <div className="user-info">
        <span>Пользователь: {user ? user.full_name : 'Гость'}</span>
        <span>Роль: {user ? user.role : 'Гость'}</span>
        {user && <button onClick={onLogout}>Выйти</button>}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  const isEqual = prevProps.user?.full_name === nextProps.user?.full_name &&
                 prevProps.user?.role === nextProps.user?.role;
  console.log(`🔍 Header shouldUpdate: ${!isEqual}`);
  return isEqual;
});

Header.displayName = 'Header';

const Filters = React.memo(({
  searchValue,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderToggle,
  categories
}) => {
  const filtersRenderCount = React.useRef(0);
  filtersRenderCount.current++;
  
  console.log(`⚙️ Filters render: ${filtersRenderCount.current}`);
  
  return (
    <div className="controls">
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск по названию, категории, описанию..."
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>

      <div className="filters">
        <select 
          value={selectedCategory} 
          onChange={onCategoryChange}
        >
          <option value="all">Все категории</option>
          {categories.filter(cat => cat !== 'all').map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select 
          value={sortBy} 
          onChange={onSortChange}
        >
          <option value="name">По названию</option>
          <option value="price">По цене</option>
          <option value="category">По категории</option>
          <option value="stock_quantity">По количеству</option>
          <option value="discount">По скидке</option>
        </select>

        <button onClick={onSortOrderToggle}>
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  const isEqual = prevProps.searchValue === nextProps.searchValue &&
                 prevProps.selectedCategory === nextProps.selectedCategory &&
                 prevProps.sortBy === nextProps.sortBy &&
                 prevProps.sortOrder === nextProps.sortOrder &&
                 prevProps.categories.length === nextProps.categories.length;
  console.log(`🔍 Filters shouldUpdate: ${!isEqual}`);
  return isEqual;
});

Filters.displayName = 'Filters';

const ProductsGrid = React.memo(({ products }) => {
  const gridRenderCount = React.useRef(0);
  gridRenderCount.current++;
  
  console.log(`📦 ProductsGrid render: ${gridRenderCount.current}, products: ${products.length}`);
  
  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  const isEqual = prevProps.products.length === nextProps.products.length &&
                 prevProps.products.every((p, i) => p.id === nextProps.products[i]?.id);
  console.log(`🔍 ProductsGrid shouldUpdate: ${!isEqual}`);
  return isEqual;
});

ProductsGrid.displayName = 'ProductsGrid';

export default ProductList;
