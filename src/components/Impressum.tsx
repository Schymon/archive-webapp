import { Impressum as ImpressumType } from '@/types/config';

interface ImpressumProps {
  data: ImpressumType;
}

export const Impressum = ({ data }: ImpressumProps) => {
  return (
    <footer className="relative z-10 border-t border-gray-300 bg-gray-200 shrink-0">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Impressum</h2>
        <div className="text-gray-600 space-y-2">
          <p><span className="text-gray-800">Name:</span> {data.name}</p>
          <p><span className="text-gray-800">Adresse:</span> {data.address}</p>
          <p><span className="text-gray-800">E-Mail:</span> <a href={`mailto:${data.email}`} className="text-blue-600 hover:text-blue-500">{data.email}</a></p>
        </div>
      </div>
    </footer>
  );
};
