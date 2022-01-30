import React, { useRef, useState } from 'react';
import { useMount, useInterval } from 'ahooks';

interface GifPlayerProps {
  images: any[];
}

const GifPlayer: React.FC<GifPlayerProps> = props => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(-1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useInterval(
    () => {
      if (index < 0 || index + 1 >= props.images.length) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
      const ctx = canvasRef.current?.getContext('2d');
      const img = document.createElement('img');
      img.onload = () => {
        if (canvasRef.current) {
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
        }

        ctx?.drawImage(img, 0, 0);
      };
      img.src = props.images[index];
    },
    isPlaying ? 80 : undefined
  );

  const play = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  const onImageClick = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  useMount(() => {
    play();
  });

  return <canvas ref={canvasRef} onClick={onImageClick} />;
};

export default GifPlayer;
