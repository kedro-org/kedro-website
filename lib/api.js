const SLUG_GRAPHQL_FIELDS = `
  slug
  sys {
    firstPublishedAt
  }
`;

const POST_GRAPHQL_FIELDS = `
sys {
  firstPublishedAt
  id
  publishedAt
}
slug
title
coverImage {
  title
  url
}
socialImage {
  url
}
category
description
featuredPost
readingTime
secondaryPost
author {
  jobTitle
  name
  picture {
    height
    url
    width
  }
  urlDisplayName
}
excerpt
content {
  json
  links {
    entries {
      inline {
        __typename
      }
      block {
        sys {
          id
        }
        __typename
        ... on CodeSnippet {
          code
          codeLanguage
        }
        ... on Callout {
          content {
            json
          }
          title
        }
        ... on AsciinemaCapture {
          description
          castFile {
            url
          }
        }
        ... on Media {
          caption {
            json
          }
          media {
            height
            url 
            width
          }
          name
        }
        ... on LinkedImage {
          linkedCaption: caption
          image {
            height
            url 
            width
          }
          url
          name
          openInNewTab
        }
        ... on Video {
          title
          description
          videoId
          showControls
          startAt
        }
      }
    }
    assets {
      block {
        sys {
          id
        }
        description
        height
        title
        url
        width
      }
    }
  }
}
`;

const BLOG_GRAPHQL_FIELDS = `
sys {
  firstPublishedAt
  id
  publishedAt
}
slug
title
coverImage {
  title
  url
}
category
readingTime
description
featuredPost
secondaryPost
author {
  name
  urlDisplayName
}
excerpt
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items;
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );

  return extractPost(entry);
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: sys_firstPublishedAt_DESC) {
        items {
          ${SLUG_GRAPHQL_FIELDS}
        }
      }
    }`
  );

  return extractPostEntries(entries);
}

export async function getAllPostsForBlog(preview) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(order: sys_firstPublishedAt_DESC, preview: ${
        preview ? 'true' : 'false'
      }) {
        items {
          ${BLOG_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: sys_firstPublishedAt_DESC, preview: ${
      preview ? 'true' : 'false'
    }, limit: 5) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  return {
    morePosts: extractPostEntries(entries),
    post: extractPost(entry),
  };
}

export async function getAllAuthors() {
  const entries = await fetchGraphQL(
    `query {
      authorCollection {
        items {
          name
          urlDisplayName
          sys {
            id
          }
        }
      }
    }`
  );

  return entries?.data?.authorCollection?.items;
}

export async function getSingleAuthor(author) {
  const entries = await fetchGraphQL(
    `query {
      authorCollection(where: {urlDisplayName: "${author}"}, limit: 20) {
        items {
          name
          bio
          picture {
            url
          }
          jobTitle
          linkedFrom {
            postCollection {
              items {
                slug
                sys {
                  firstPublishedAt
                  id
                  publishedAt
                }
                title
                category
                coverImage {
                  url
                }
                description
                readingTime
              }
            }
          }
        }
      }
    }`
  );

  return {
    authorInfo: entries?.data?.authorCollection?.items[0],
  };
}

export async function getUniquePostCategories() {
  const result = await fetchGraphQL(
    `{
        postCollection {
          items {
            category
          }
        }
    }`
  );

  const allCategories = result?.data?.postCollection?.items;
  const uniqueCategories = [
    ...new Set(allCategories.map((item) => item.category)),
  ];

  return uniqueCategories;
}

export async function getCategoryPosts(category) {
  const entries = await fetchGraphQL(
    `{
      postCollection(
        limit: 10
        order: sys_firstPublishedAt_DESC
        where: {category_contains: "${category}"}
      ) {
        items {
          sys {
            firstPublishedAt
          }
          title
          category
          description
          coverImage {
            url
            title
          }
          slug
          readingTime
          author {
            name
            urlDisplayName
          }
        }
      }
    }`
  );

  return {
    category,
    posts: entries?.data?.postCollection?.items,
  };
}
