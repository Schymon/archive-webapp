import { useEffect, useState } from 'react';
import { Config } from '@/types/config';
import { fetchConfig } from '@/lib/fetchConfig';
import { Background } from '@/components/Background';
import { Navbar } from '@/components/Navbar';
import { CategorySection } from '@/components/CategorySection';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-6 py-12">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="flex flex-col overflow-hidden">
          <Skeleton className="aspect-[2/1] w-full" />
          <CardContent className="p-4 flex flex-col flex-1">
            <Skeleton className="h-6 w-3/4 mb-3" />
            <div className="flex flex-col gap-2 mt-auto">
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function App() {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConfig()
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Fehler beim Laden</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Background />
      <div className="min-h-screen flex flex-col">
        {config && <Navbar />}
        <main className="flex-1 overflow-y-auto">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            config?.categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
