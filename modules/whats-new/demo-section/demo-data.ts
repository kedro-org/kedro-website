export interface Demo {
  title: string;
  videoSrc: string;
  posterSrc: string;
}

export const demoData: Demo[] = [
  {
    title: 'Building genAI with Kedro',                                                                                                    
    videoSrc: '/videos/building-genai-with-kedro-business.mp4',                                                                                                       
    posterSrc: '/images/genai-with-kedro-poster.jpeg',                                                                                                
  },
  {
    title: 'Jupyter Notebook to Kedro Project Converter',                                                                                                    
    videoSrc: '/videos/kedro-notebook-converter.mp4',                                                                                                       
    posterSrc: '/images/kedro-notebook-converter-poster.png',                                                                                                
  },
  {
    title: 'What is Kedro-Viz?',                                                                                                    
    videoSrc: '/videos/kedro-viz-explainer.mp4',                                                                                                       
    posterSrc: '/images/what-is-kedro-viz-poster.jpeg',                                                                                                
  }
];
