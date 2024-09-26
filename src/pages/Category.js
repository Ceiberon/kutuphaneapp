import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1'; // Varsayılan URL eklenmiştir

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' }); // description alanı eklendi
  const [editData, setEditData] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    fetch(`${apiUrl}/categories`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();  // JSON olarak al
      })
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editData ? `${apiUrl}/categories/${editData.id}` : `${apiUrl}/categories`;
    const method = editData ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (editData) {
        setCategories(categories.map(c => c.id === editData.id ? data : c));
        setEditData(null);
      } else {
        setCategories([...categories, data]);
      }
      handleOpenModal();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name, description: category.description }); // description alanı eklendi
    setEditData(category);
  };

  const handleDelete = (id) => {
    fetch(`${apiUrl}/categories/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setCategories(categories.filter(c => c.id !== id));
        handleOpenModal();
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Kategoriler</h2>
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Ana Sayfa</Link>
      </header>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded shadow-lg">
        <label className="block mb-4">
          Kategori Adı:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Açıklama:
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editData ? 'Güncelle' : 'Ekle'}
        </button>
      </form>
      <h3 className="text-xl font-bold mb-4">Kategori Listesi:</h3>
      <ul className="list-none p-0">
        {categories.map(category => (
          <li key={category.id} className="bg-white p-4 mb-2 rounded shadow flex justify-between items-center">
            <span>{category.name} - {category.description}</span> {/* Açıklama eklendi */}
            <div className="space-x-2">
              <button onClick={() => handleEdit(category)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Düzenle</button>
              <button onClick={() => handleDelete(category.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Sil</button>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editData ? "Güncelleme Başarı" : "Ekleme Başarı"}
        message={editData ? "Kategori başarıyla güncellendi!" : "Kategori başarıyla eklendi!"}
      />
    </div>
  );
};

export default Categories;
