import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1'; // Varsayılan URL eklendi

const Publishers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', establishmentYear: '', address: '' }); // Yeni alanlar eklendi
  const [editData, setEditData] = useState(null);
  const [publishers, setPublishers] = useState([]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    fetch(`${apiUrl}/publishers`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setPublishers(data))
      .catch(error => console.error('Error fetching publishers:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editData ? `${apiUrl}/publishers/${editData.id}` : `${apiUrl}/publishers`;
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
        setPublishers(publishers.map(p => p.id === editData.id ? data : p));
        setEditData(null);
      } else {
        setPublishers([...publishers, data]);
      }
      handleOpenModal();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleEdit = (publisher) => {
    setFormData({ name: publisher.name, establishmentYear: publisher.establishmentYear, address: publisher.address }); // Yeni alanlar eklendi
    setEditData(publisher);
  };

  const handleDelete = (id) => {
    fetch(`${apiUrl}/publishers/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setPublishers(publishers.filter(p => p.id !== id));
        handleOpenModal();
      })
      .catch(error => {
        console.error('Error deleting publisher:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Yayıncılar</h2>
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Ana Sayfa</Link>
      </header>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded shadow-lg">
        <label className="block mb-4">
          Yayıncı Adı:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Kuruluş Yılı:
          <input
            type="number"
            value={formData.establishmentYear}
            onChange={(e) => setFormData({ ...formData, establishmentYear: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Adres:
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
      <h3 className="text-xl font-bold mb-4">Yayıncı Listesi:</h3>
      <ul className="list-none p-0">
        {publishers.map(publisher => (
          <li key={publisher.id} className="bg-white p-4 mb-2 rounded shadow flex justify-between items-center">
            <span>{publisher.name} - {publisher.establishmentYear} - {publisher.address}</span> {/* Yeni alanlar eklendi */}
            <div className="space-x-2">
              <button onClick={() => handleEdit(publisher)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Düzenle</button>
              <button onClick={() => handleDelete(publisher.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Sil</button>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editData ? "Güncelleme Başarı" : "Ekleme Başarı"}
        message={editData ? "Yayıncı başarıyla güncellendi!" : "Yayıncı başarıyla eklendi!"}
      />
    </div>
  );
};

export default Publishers;
