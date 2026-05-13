import { useState } from 'react';
import { ArchiveItem } from '@/types/config';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PasswordModal } from './PasswordModal';

interface DownloadCardProps {
  item: ArchiveItem;
}

export const DownloadCard = ({ item }: DownloadCardProps) => {
  const [unlockedUrls, setUnlockedUrls] = useState<Record<number, boolean>>({});
  const [showModal, setShowModal] = useState<number | null>(null);

  const handleUnlock = (downloadIndex: number) => {
    setUnlockedUrls((prev) => ({ ...prev, [downloadIndex]: true }));
    setShowModal(null);
  };

  return (
    <>
      <Card className="flex flex-col overflow-hidden">
        <div className="aspect-[2/1] relative shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <CardTitle className="text-xl mb-3">{item.title}</CardTitle>
          <div className="flex flex-col gap-2 mt-auto">
            {item.downloads.map((download, index) => (
              <div key={index}>
                {download.passwordRequired && !unlockedUrls[index] ? (
                  <Button
                    onClick={() => setShowModal(index)}
                    className="w-full"
                    variant="default"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {download.label}
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <a
                      href={download.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {download.label}
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showModal !== null && (
        <PasswordModal
          item={item}
          downloadIndex={showModal}
          onSuccess={(index) => handleUnlock(index)}
          onClose={() => setShowModal(null)}
        />
      )}
    </>
  );
};
