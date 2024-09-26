import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800">Kütüphane Yönetim Sistemi</h1>
        <p className="text-lg text-gray-600 mt-2">Tüm kitap, yazar ve kategori işlemlerini burada yapabilirsiniz.</p>
      </header>
      
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0 md:w-1/3 text-center">
          <h2 className="text-3xl font-semibold text-blue-600">Yayıncılar</h2>
          <p className="text-gray-600 mt-2">Yayınevleri ve yayıncıları yönetebilirsiniz.</p>
          <Link to="/publisher" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Yayıncılar</Link>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0 md:w-1/3 text-center">
          <h2 className="text-3xl font-semibold text-green-600">Kategoriler</h2>
          <p className="text-gray-600 mt-2">Kitapları kategorilere ayırabilir ve yönetebilirsiniz.</p>
          <Link to="/category" className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Kategoriler</Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/3 text-center">
          <h2 className="text-3xl font-semibold text-red-600">Kitaplar</h2>
          <p className="text-gray-600 mt-2">Kitapları ekleyebilir, düzenleyebilir ve silebilirsiniz.</p>
          <Link to="/book" className="mt-4 inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Kitaplar</Link>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:space-x-6 mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0 md:w-1/3 text-center">
          <h2 className="text-3xl font-semibold text-purple-600">Yazarlar</h2>
          <p className="text-gray-600 mt-2">Yazarları ekleyebilir ve yönetebilirsiniz.</p>
          <Link to="/author" className="mt-4 inline-block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Yazarlar</Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/3 text-center">
          <h2 className="text-3xl font-semibold text-yellow-600">Kitap Alma</h2>
          <p className="text-gray-600 mt-2">Kitap alma işlemlerini yönetebilirsiniz.</p>
          <Link to="/purchase" className="mt-4 inline-block px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Kitap Alma</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
