import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PageHeader } from '../../components/page-header';
import { StarRating } from '../../components/star-rating';
import { CatCallToAction } from '../../components/cat-call-to-action';
import { Cat } from '@felitech/shared-types';

export const getCat = async (id: string | number): Promise<Cat> => {
  const response = await axios.get<Cat>(`/api/cats/${id}`);
  return response.data;
};

export function SingleCatPage() {
  const { id } = useParams<{ id: string }>();
  const [cat, setCat] = useState<Cat | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCat(id).then((cat) => setCat(cat));
    }
  }, [id]);

  if (!cat) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PageHeader title={cat.name}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <span className="material-icons text-sm">arrow_back</span>
          Back
        </button>
      </PageHeader>

      <div className="bg-white rounded-xl shadow-lg run-overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 h-96 md:h-auto relative">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={cat.imageUrl}
            alt={cat.name}
          />
        </div>
        <div className="p-8 md:w-1/2 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
              Cat Profile
            </div>
            <CatCallToAction cat={cat} />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-6 grow">
            {cat.description}
          </p>

          <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium text-sm">
                Apartment Friendly
              </span>
              <StarRating rating={cat.compatibility.apartmentFriendly} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium text-sm">
                Child Friendly
              </span>
              <StarRating rating={cat.compatibility.childFriendly} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium text-sm">Calm</span>
              <StarRating rating={cat.compatibility.calm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
