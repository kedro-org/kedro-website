import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Content {
  content: {
    json: Document;
    links: any;
  };
}

interface _Block {
  sys: {
    id: string;
  };
  __typename: string;
}

interface Links {
  assets: {
    block: _Block[];
  };
  entries: {
    block: _Block[];
    inline: any[];
  };
}

interface Node {
  content: any[];
  data: {
    target: {
      sys: {
        id: string;
        linkType: string;
        type: string;
      };
    };
  };
  nodeType: string;
}

const renderOptions = (links: Links) => {
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
      [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
        const entry = entryMap.get(node.data.target.sys.id);

        if (entry.__typename === 'CodeSnippet') {
          return (
            <SyntaxHighlighter
              language={entry.codeLanguage}
              style={materialLight}
              showLineNumbers
            >
              {entry.code}
            </SyntaxHighlighter>
          );
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        const asset = assetMap.get(node.data.target.sys.id);

        return <Image src={asset.url} layout="fill" alt={asset.description} />;
      },
    },
  };
};

export default function PostBody({ content }: Content) {
  const { json, links } = content;

  return (
    <div className="max-w-2xl mx-auto">
      <div>{documentToReactComponents(json, renderOptions(links) as any)}</div>
    </div>
  );
}
