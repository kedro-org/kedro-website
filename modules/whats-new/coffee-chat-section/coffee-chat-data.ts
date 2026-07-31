export interface CoffeeChat {
  date: string;
  title: string;
  description: string;
  youtubeUrl: string;
}

export const coffeeChatData: CoffeeChat[] = [
  {
    date: '19 Jun 2026',
    title: 'GraphRAG with Kedro',
    description:
      'Building a GraphRAG pipeline with Kedro, combining knowledge graphs with retrieval-augmented generation for richer, more contextual answers from your data.',
    youtubeUrl: 'https://www.youtube.com/watch?v=--DfHOWTLR8',
  },
  {
    date: '5 Jun 2026',
    title: 'Kedro in VS Code: From Pipeline View to One-Click Node Debugging',
    description:
      'A walkthrough of the Kedro extension for VS Code, from visualizing your pipeline to debugging individual nodes with a single click.',
    youtubeUrl: 'https://www.youtube.com/watch?v=q_zIPA6tzxM',
  },
  {
    date: '22 May 2026',
    title: 'Should AI Write Your Docs? A Team Discussion',
    description:
      'The Kedro team discusses whether and how AI should be used to write and maintain technical documentation.',
    youtubeUrl: 'https://www.youtube.com/watch?v=5NDeTIyjBoo',
  },
  {
    date: '8 May 2026',
    title: 'Spec-Driven Development for Data Practitioners',
    description:
      'Exploring how spec-driven development brings clearer requirements and more reliable, agent-assisted workflows to data practitioners.',
    youtubeUrl: 'https://www.youtube.com/watch?v=rNYRe3nGPQA',
  },
  {
    date: '24 Apr 2026',
    title: 'Now serving: Exposing Kedro Pipelines over HTTP',
    description:
      'How to expose Kedro pipelines as HTTP endpoints, turning your pipelines into services that other applications can call.',
    youtubeUrl: 'https://www.youtube.com/watch?v=4ygwCQdX6PE',
  },
  {
    date: '10 Apr 2026',
    title: 'Ship GenAI with Confidence: Evaluation Pipelines with Kedro and Langfuse',
    description:
      'Introducing LangfuseEvaluationDataset for structured, reproducible evaluation within Kedro’s catalog-driven workflows.',
    youtubeUrl: 'https://www.youtube.com/watch?v=7uZ-eiw43i0',
  },
];

export const coffeeChatPlaylistUrl =
  'https://www.youtube.com/playlist?list=PL-JJgymPjK5JrhRT-Op6cFToMmbfY3FFy';
