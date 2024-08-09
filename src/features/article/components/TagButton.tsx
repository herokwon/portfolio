'use client';

import { Tag } from 'herokwon-ds';
import { LuHash } from 'react-icons/lu';

interface TagButtonProps {
  tag: string;
}

export default function TagButton({ tag }: TagButtonProps) {
  return (
    <Tag
      stopPropagation
      iconBefore={{
        content: LuHash,
      }}
      href={{
        to: `/posts?tag=${encodeURIComponent(tag)}`,
      }}
      data-testid="article-tag"
    >
      {tag}
    </Tag>
  );
}
