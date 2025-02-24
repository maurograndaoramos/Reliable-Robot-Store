'use client';
import { useState, useEffect } from 'react';
import TagCard from '@/components/TagsPage/TagCard';
import Hero from '@/components/TagsPage/Hero';
import LoadingPage from '@/components/Loading';
import ErrorPage from '@/components/Error';

interface Tag {
  tags: string[];
}

export default function TagsPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch('/api/tags');
        const data: Tag = await response.json();
        setTags(data.tags);
      } catch {
        setError('Failed to load tags');
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, []);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <div className="space-y-8">
      <Hero />
      <h1 className="text-3xl font-bold">Product Tags</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {tags.map((tag) => (
          <TagCard key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}