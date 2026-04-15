export interface CoffeeChat {
  date: string;
  title: string;
  description: string;
  youtubeUrl: string;
}

export const coffeeChatData: CoffeeChat[] = [
   {
    date: '10 Apr 2026',
    title: 'Ship GenAI with Confidence: Evaluation Pipelines with Kedro and Langfuse',
    description:
      'Introducing LangfuseEvaluationDataset for structured, reproducible evaluation within Kedro’s catalog-driven workflows.',
    youtubeUrl: 'https://www.youtube.com/watch?v=7uZ-eiw43i0',
  },
  {
    date: '27 Mar 2026',
    title: 'Let AI Agents Manage Your ML and Data Pipelines with Kedro and MCP',
    description:
      'Exploring how Kedro pipelines can be exposed through an MCP server, enabling AI agents built with LangGraph or Claude Code to orchestrate workflows programmatically.',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZjZUMGPMQ0k&t=1565s',
  },
  {
    date: '13 Mar 2026',
    title: 'Databricks & SparkDatasetV2: Modern Workflows with Kedro',
    description:
      'Enabling modern, scalable workflows on Databricks with Kedro’s SparkDatasetV2 dataset.',
    youtubeUrl: 'https://www.youtube.com/watch?v=kmWTReVDjRM',
  },
  {
    date: '13 Feb 2026',
    title: 'Making Kedro Easier to Learn: Demo Series & Pipeline Builder',
    description:
      'A walkthrough of the new beginner-friendly demo series and the Pipeline Builder tool designed to lower the barrier to entry for new Kedro users.',
    youtubeUrl: 'https://www.youtube.com/watch?v=qOm6GNBayqQ',
  },
  {
    date: '30 Jan 2026',
    title: 'Agentic Candidate Screening with Kedro & CrewAI',
    description:
      'See how AI agents can automate candidate screening: from parsing resumes to recommending next steps using Kedro and CrewAI.',
    youtubeUrl: 'https://www.youtube.com/watch?v=CbkwSWSf4zc',
  },
  {
    date: '16 Jan 2026',
    title: 'From Prompt to Slides: Agentic Workflows with Kedro & AutoGen',
    description:
      'A live demo showing how Kedro powers an end-to-end GenAI workflow for slide generation, how AutoGen integrates with Kedro and how single-agent and multi-agent setups compare in practice.',
    youtubeUrl: 'https://www.youtube.com/watch?v=PkwFgQc5CqA',
  },

 
];

export const coffeeChatPlaylistUrl =
  'https://www.youtube.com/playlist?list=PL-JJgymPjK5JrhRT-Op6cFToMmbfY3FFy';
