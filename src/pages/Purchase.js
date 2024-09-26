import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

const Purchase = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    borrowerName: '',
    borrowerMail: '',
    borrowingDate: '',
    returnDate: '',
    bookId: '',
  });
  const [editData, setEditData] = useState(null);
  const [borrowings, setBorrowings] = useState([]);
  const [books, setBooks] = useState([]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    // Kitapları yükle
    fetch(`${apiUrl}/books`)
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        console.log('Fetched books:', data);
        setBooks(data);
      })
      .catch((error) => console.error('Error fetching books:', error));

    // Ödünç alma kayıtlarını yükle
    fetch(`${apiUrl}/borrows`)
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        console.log('Fetched borrowings:', data);
        setBorrowings(data);
      })
      .catch((error) => console.error('Error fetching borrowings:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editData ? `${apiUrl}/borrows/${editData.id}` : `${apiUrl}/borrows`;
    const method = editData ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        borrowerName: formData.borrowerName,
        borrowerMail: formData.borrowerMail,
        borrowingDate: formData.borrowingDate,
        bookForBorrowingRequest: {
          id: formData.bookId,
          name: '', // İhtiyaç varsa buraya kitap adı eklenebilir
          publicationYear: 0, // Eğer gerekli değilse bu alanı kaldırabilirsiniz
          stock: 0 // Eğer gerekli değilse bu alanı kaldırabilirsiniz
        }
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        if (editData) {
          setBorrowings(borrowings.map((b) => (b.id === editData.id ? data : b)));
          setEditData(null);
        } else {
          setBorrowings([...borrowings, data]);
        }
        handleOpenModal();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleEdit = (borrowing) => {
    setFormData({
      borrowerName: borrowing.borrowerName,
      borrowerMail: borrowing.borrowerMail,
      borrowingDate: borrowing.borrowingDate,
      returnDate: borrowing.returnDate,
      bookId: borrowing.book.id,
    });
    setEditData(borrowing);
  };

  const handleDelete = (id) => {
    fetch(`${apiUrl}/borrows/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        setBorrowings(borrowings.filter((b) => b.id !== id));
        handleOpenModal();
      })
      .catch((error) => {
        console.error('Error deleting borrowing:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Ödünç Alma Sayfası</h2>
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Ana Sayfa</Link>
      </header>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded shadow-lg">
        <label className="block mb-4">
          İsim:
          <input
            type="text"
            value={formData.borrowerName}
            onChange={(e) => setFormData({ ...formData, borrowerName: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          E-posta:
          <input
            type="email"
            value={formData.borrowerMail}
            onChange={(e) => setFormData({ ...formData, borrowerMail: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Alım Tarihi:
          <input
            type="date"
            value={formData.borrowingDate}
            onChange={(e) => setFormData({ ...formData, borrowingDate: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          İade Tarihi:
          <input
            type="date"
            value={formData.returnDate}
            onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Kitap Seç:
          <select
            value={formData.bookId}
            onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          >
            <option value="">Seçiniz</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>{book.name}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editData ? 'Güncelle' : 'Ekle'}
        </button>
      </form>
      <h3 className="text-xl font-bold mb-4">Ödünç Alma Listesi:</h3>
      <ul className="list-none p-0">
        {borrowings.map((borrowing) => (
          <li key={borrowing.id} className="bg-white p-4 mb-2 rounded shadow flex justify-between items-center">
            <span>{borrowing.borrowerName} - {borrowing.book ? borrowing.book.name : 'Kitap yok'}</span>
            <div className="space-x-2">
              <button onClick={() => handleEdit(borrowing)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Düzenle</button>
              <button onClick={() => handleDelete(borrowing.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Sil</button>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editData ? "Güncelleme Başarı" : "Ekleme Başarı"}
        message={editData ? "Ödünç alma başarıyla güncellendi!" : "Ödünç alma başarıyla eklendi!"}
      />
    </div>
  );
};

export default Purchase;
