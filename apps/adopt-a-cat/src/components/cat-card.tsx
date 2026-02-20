import { Cat } from '@felitech/shared-types';
import { Link } from 'react-router-dom';
import { CatCallToAction } from './cat-call-to-action';

export interface CatCardProps {
  cat: Cat;
}

export function CatCard({ cat }: CatCardProps) {
  return (
    <Link
      to={`/cats/${cat.id}`}
      className="relative group cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full h-full block"
    >
      <div className="p-4 flex flex-col items-center gap-4 h-full">
        <h3 className="text-xl font-bold text-center text-gray-800 line-clamp-1">
          {cat.name}
        </h3>
        <div className="relative overflow-hidden rounded-lg w-[200px] h-[200px] shrink-0 bg-gray-50">
          <img
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
            src={cat.imageUrl}
            width={200}
            height={200}
            alt={cat.name}
          />
        </div>

        <CatCallToAction
          cat={cat}
          className="w-full justify-center z-10 relative"
        />

        {cat.isFavorite && (
          <div className="absolute top-2 right-2 bg-pink-500 text-white p-1 rounded-full shadow-md">
            <span className="material-icons text-sm">favorite</span>
          </div>
        )}
      </div>
    </Link>
  );
}
