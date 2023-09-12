import React, { useState } from 'react';
import Link from 'next/link';

const PostCategoryLinks = ({ categories }: { categories: string }) => {
  const [postCategories] = useState(
    categories.split(',').map((category) => category.trim())
  );

  const links = postCategories.map((category: string, index: number) => {
    return (
      <React.Fragment key={category}>
        <Link href={`/blog/category/${category}`} style={{ color: 'inherit' }}>
          {category}
        </Link>
        {postCategories.length > index + 1 ? ', ' : ''}
      </React.Fragment>
    );
  });

  return <>{links}</>;
};

export default PostCategoryLinks;
