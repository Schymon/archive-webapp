import { Category } from '@/types/config';
import { DownloadCard } from './DownloadCard';

interface CategorySectionProps {
  category: Category;
}

export const CategorySection = ({ category }: CategorySectionProps) => {
  return (
    <section className="relative z-10 px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">{category.title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 place-content-center">
        {category.items.map((item) => (
          <DownloadCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
