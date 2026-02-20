import { Cat } from '@felitech/shared-types';

export interface CatCallToActionProps {
  cat: Cat;
  className?: string;
}

export function CatCallToAction({ cat, className = '' }: CatCallToActionProps) {
  const handleAdopt = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside a link
    e.stopPropagation();
    alert(
      `Thank you for your interest in adopting ${cat.name}! We will contact you shortly.`,
    );
  };

  return (
    <button
      onClick={handleAdopt}
      className={`
        inline-flex items-center gap-2 px-4 py-2
        bg-indigo-600 text-white rounded-lg
        hover:bg-indigo-700 active:bg-indigo-800
        transition-colors shadow-sm
        font-medium text-sm
        ${className}
      `}
      aria-label={`Adopt ${cat.name}`}
    >
      <span className="material-icons text-sm">pets</span>
      <span>Adopt {cat.name}</span>
    </button>
  );
}
