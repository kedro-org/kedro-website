import { useEffect, useRef, useState } from 'react';
import 'asciinema-player/dist/bundle/asciinema-player.css';

type AsciinemaPlayerProps = {
  src: string;
  autoPlay?: boolean;
  cols?: string;
  fit?: string;
  fontSize?: string;
  idleTimeLimit?: number;
  loop?: boolean | number;
  poster?: string;
  preload?: boolean;
  rows?: string;
  speed?: number;
  startAt?: number | string;
  theme?: string;
};

function AsciinemaPlayer({ src, ...asciinemaOptions }: AsciinemaPlayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<typeof import('asciinema-player')>();

  useEffect(() => {
    import('asciinema-player').then((player) => {
      setPlayer(player);
    });
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    const instance = player?.create(src, currentRef, asciinemaOptions);

    return () => {
      instance?.dispose();
    };
  }, [src, player, asciinemaOptions]);

  return <div ref={ref} />;
}

export default AsciinemaPlayer;
