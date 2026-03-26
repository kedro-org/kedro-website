export interface CoffeeChat {
  date: string;
  title: string;
  description: string;
  youtubeUrl: string;
}

export const coffeeChatData: CoffeeChat[] = [
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
  {
    date: '19 Dec 2025',
    title: "Kedro's GenAI Journey: Highlights from the Year",
    description:
      'A year-end recap of how the Kedro community embraced generative AI — from LangChain integrations to agentic pipelines and beyond.',
    youtubeUrl: 'https://www.youtube.com/watch?v=Id6b7aVyWyA',
  },
  {
    date: '05 Dec 2025',
    title:
      'Building a Cyberpunk 2077 Knowledge Base with Kedro + LangChain',
    description:
      'A fun, hands-on session building a RAG-powered knowledge base for the Cyberpunk 2077 universe using Kedro pipelines and LangChain.',
    youtubeUrl: 'https://www.youtube.com/watch?v=L4NRorVTC5w',
  },
  {
    date: '07 Nov 2025',
    title: 'A Sneak Peek into the Future of Building with Kedro',
    description:
      'Preview of two experimental features — Kedro MCP for converting notebooks to projects, and the Pipeline Builder for creating pipelines from ideas.',
    youtubeUrl: 'https://www.youtube.com/watch?v=0S8hl3q3CBY',
  },
];

export const coffeeChatPlaylistUrl =
  'https://www.youtube.com/playlist?list=PL-JJgymPjK5JrhRT-Op6cFToMmbfY3FFy';
