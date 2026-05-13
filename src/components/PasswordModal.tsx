import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArchiveItem } from '@/types/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PasswordModalProps {
  item: ArchiveItem;
  downloadIndex: number;
  onSuccess: (index: number) => void;
  onClose: () => void;
}

export const PasswordModal = ({ item, downloadIndex, onSuccess, onClose }: PasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const download = item.downloads[downloadIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === download.password) {
      onSuccess(downloadIndex);
    } else {
      setError(true);
    }
  };

  if (!mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-background border rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        {download.passwordHint ? (
          <p className="text-muted-foreground mb-4">{download.passwordHint}</p>
        ) : (
          <p className="text-muted-foreground mb-4">Passwort erforderlich für "{download.label}"</p>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Passwort eingeben"
            className={error ? 'border-red-500' : ''}
            autoFocus
          />
          {error && (
            <p className="text-destructive text-sm mt-2">Falsches Passwort</p>
          )}
          <div className="flex gap-3 mt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Abbrechen
            </Button>
            <Button type="submit" variant="default" className="flex-1">
              Entsperren
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
