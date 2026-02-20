import { useState, SyntheticEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cat } from '@felitech/shared-types';
import { PageHeader } from '../../components/page-header';
import { BUTTON_STYLE } from '../browse-cats/browse-cats.constants';

export function AdminPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    description: '',
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post<Cat>('/api/cats', formData);
      navigate('/');
    } catch (error) {
      console.error('Failed to create cat', error);
      alert('Failed to create cat');
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <PageHeader title="Add a New Cat" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Enter cat's name"
          />
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="https://example.com/cat.jpg"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Tell us about this cat..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" className={BUTTON_STYLE}>
            Add Cat
          </button>
        </div>
      </form>
    </div>
  );
}
