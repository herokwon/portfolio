'use client';

import { Tag } from 'herokwon-ds';
import { LuHash } from 'react-icons/lu';

interface TagButtonProps {
  tag: string;
}

export default function TagButton({ tag }: TagButtonProps) {
  return (
    <Tag
      preventDefault
      label={tag}
      iconBefore={{
        icon: LuHash,
      }}
      href={{
        to: `/posts?tag=${encodeURIComponent(tag)}`,
      }}
      title={`${tag} 태그 찾아보기`}
      data-testid="article-tag"
    />
  );
}
