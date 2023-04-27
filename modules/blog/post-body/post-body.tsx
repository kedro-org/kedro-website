import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { scrollToTargetAdjusted } from '../../../utils/blog';

import Image from 'next/image';
import Link from 'next/link';

import style from './post-body.module.scss';

interface Props {
  content: {
    json: Document;
    links: any;
  };
  slug: string;
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
    uri: string;
  };
  nodeType: string;
}

interface NavigationList {
  headerId: string;
  headerTitle: string;
}

const headerTextToIdString = (
  text: string | { props: { children: string } }
) => {
  if (typeof text === 'object') {
    return text.props.children
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[\'?]/g, '')
      .trim();
  } else {
    return text.split(' ').join('-').toLowerCase().replace(/[\'?]/g, '').trim();
  }
};

const isSameHost = (str: string) => {
  return str.includes('kedro.org');
};

const renderOptions = (links: Links, getMap: any = new Map()) => {
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

        if (entry.__typename === 'Callout') {
          return (
            <div className={style.postBodyCallout}>
              <h2
                id={headerTextToIdString(entry.title)}
                ref={(node) => {
                  const map = getMap();

                  if (node) {
                    map.set(headerTextToIdString(entry.title), node);
                  } else {
                    map.delete(headerTextToIdString(entry.title));
                  }
                }}
              >
                {entry.title}
              </h2>
              <div>
                {documentToReactComponents(
                  entry.content.json,
                  renderOptions(links) as any
                )}
              </div>
            </div>
          );
        }

        if (entry.__typename === 'Media') {
          return (
            <div className={style.postBodyImgWrapper}>
              <Image
                alt={entry.name}
                height={entry.media.height}
                src={entry.media.url}
                width={entry.media.width}
              />
              <div className={style.postBodyImgCaption}>
                {documentToReactComponents(
                  entry.caption.json,
                  renderOptions(links) as any
                )}
              </div>
            </div>
          );
        }

        if (entry.__typename === 'Video') {
          return (
            <>
              <div className={style.postBodyVideoWrapper}>
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder="0"
                  src={`https://www.youtube.com/embed/${
                    entry.videoId
                  }?controls=${+entry.showControls}&start=${entry.startAt}`}
                  title="YouTube video player"
                />
              </div>
              {entry.description ? (
                <div className={style.postBodyVideoCaption}>
                  {entry.description}
                </div>
              ) : null}
            </>
          );
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        const asset = assetMap.get(node.data.target.sys.id);

        return (
          <div className={style.postBodyImgWrapper}>
            <Image
              alt={asset.description}
              height={asset.height}
              src={asset.url}
              width={asset.width}
            />
            <div className={style.postBodyImgCaption}>{asset.title}</div>
          </div>
        );
      },
      [BLOCKS.HEADING_2]: (node: Node, children: [string]) => {
        return (
          <h2
            id={headerTextToIdString(children[0])}
            ref={(node) => {
              const map = getMap();

              if (node) {
                map.set(headerTextToIdString(children[0]), node);
              } else {
                map.delete(headerTextToIdString(children[0]));
              }
            }}
          >
            {children}
          </h2>
        );
      },
      [INLINES.HYPERLINK]: (node: Node) => {
        const targetValue = isSameHost(node.data.uri) ? '_self' : '_blank';

        return (
          <a href={node.data.uri} target={targetValue} rel="noreferrer">
            {node.content[0].value}
          </a>
        );
      },
    },
  };
};

export default function PostBody({ content, slug }: Props) {
  const { json, links } = content;
  const [navigationList, setNavigationList] = useState<NavigationList[]>([]);
  const [activeNavItem, setActiveNavItem] = useState<String>('');
  let headerRefs = useRef<Map<string, HTMLHeadingElement>>(null);

  function getMap() {
    if (!headerRefs.current) {
      // Initialize the Map on first usage.
      headerRefs.current = new Map();
    }
    return headerRefs.current;
  }

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        setActiveNavItem('#' + entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    headerRefs.current.forEach((sectionRef) => {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
      });

      observer.observe(sectionRef);

      return () => {
        observer.disconnect();
      };
    });
  }, [handleIntersection, slug]);

  useEffect(() => {
    const _h2s = document.querySelectorAll("div[class^='post-body'] h2");

    setNavigationList([]);

    _h2s.forEach((header: Element) => {
      setNavigationList((navigationList) => [
        ...navigationList,
        {
          headerId: header.id,
          headerTitle: header.textContent,
        },
      ]);
    });
  }, [slug]);

  return (
    <div className={style.postBodyWrapper}>
      <div className={style.postBody}>
        {documentToReactComponents(json, renderOptions(links, getMap) as any)}
        <hr className={style.bottomDivider} />
      </div>
      <div className={style.stickyNav}>
        <div className={style.stickyNavText}>On this page:</div>
        {navigationList.map((section) => {
          return (
            <a
              className={classNames(style.stickyNavLink, {
                [style.stickyNavLinkActive]:
                  activeNavItem === `#${section.headerId}`,
              })}
              href={`#${section.headerId}`}
              key={section.headerTitle}
              onClick={(e) => {
                const sectionId = headerTextToIdString(section.headerTitle);
                const currentUrl = window.location.href;
                const existingHashIndex = currentUrl.indexOf('#');
                const updatedUrl =
                  existingHashIndex !== -1
                    ? `${currentUrl.substring(
                        0,
                        existingHashIndex
                      )}#${sectionId}`
                    : `${currentUrl}#${sectionId}`;

                e.preventDefault();
                history.replaceState(null, null, updatedUrl);
                scrollToTargetAdjusted(section.headerId);
              }}
            >
              {section.headerTitle}
            </a>
          );
        })}
        <hr className={style.stickyNavBottomLine} />
        <div className={style.stickyNavBackWrapper}>
          <Link href="/blog">
            <a>
              <button className={style.stickyNavBackButton}>
                <Image
                  alt="Back arrow"
                  height={22}
                  src="/images/back-arrow.svg"
                  width={22}
                />
                Back to Blog home
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
