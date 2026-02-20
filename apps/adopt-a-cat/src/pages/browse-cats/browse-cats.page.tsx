import { useEffect, useState } from 'react';
import { GRID_LAYOUT_CLASSES, SECTION_PADDING } from './browse-cats.constants';
import axios from 'axios';
import { Cat } from '@felitech/shared-types';
import { CatCard } from '../../components/cat-card';
import { PageHeader } from '../../components/page-header';

const getCats = async (): Promise<Cat[]> => {
  const response = await axios.get<Cat[]>('/api/cats');
  return response.data;
};

export function BrowseCatsPage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getCats().then((cats) => setCats(cats));
  }, []);

  const filteredCats = cats.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={SECTION_PADDING}>
      <PageHeader title="Browse Cats">
        <p className="text-gray-500 text-sm font-medium">
          Showing {filteredCats.length} cats
        </p>
      </PageHeader>
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="flex-1 min-w-50 flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase text-gray-500 tracking-wide">
            Search cats
          </label>
          <input
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className={GRID_LAYOUT_CLASSES}>
        {filteredCats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
}
