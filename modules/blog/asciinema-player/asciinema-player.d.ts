declare module 'asciinema-player' {
  export function create(
    src: string,
    element: HTMLElement | null,
    opts: {
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
    }
  );
}
