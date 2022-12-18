import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const renderOptions = (links) => {
  // Create an asset map
  const assetMap = new Map();
  // Loop through the assets and add them to the map
  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }

  // Create an entry map
  const entryMap = new Map();
  // Loop through the block linked entries and add them to the map
  for (const entry of links.entries.block) {
    entryMap.set(entry.sys.id, entry);
  }

  // Loop through the inline linked entries and add them to the map
  for (const entry of links.entries.inline) {
    entryMap.set(entry.sys.id, entry);
  }

  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entry = entryMap.get(node.data.target.sys.id);

        if (entry.__typename === 'CodeSnippet') {
          return (
            <SyntaxHighlighter
              language={entry.codeLanguage}
              style={oneLight}
              showLineNumbers
            >
              {entry.code}
            </SyntaxHighlighter>
          );
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = assetMap.get(node.data.target.sys.id);

        return <Image src={asset.url} layout="fill" alt={asset.description} />;
      },
    },
  };
};

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div>
        {documentToReactComponents(content.json, renderOptions(content.links))}
      </div>
    </div>
  );
}
