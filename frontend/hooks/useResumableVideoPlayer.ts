// resuable player that takes cached video data of where it left off and plays video based on where it was ended
import { useEffect, useRef, useCallback } from 'react';
import { useVideoPlayer } from 'expo-video';
import { useFocusEffect } from '@react-navigation/native';
import { useVideoPositionStore } from '@/store/useVideoPositionStore';

export function useResumableVideoPlayer(videoUrl: string, options?: { muted?: boolean }) {
  const { savePosition, getPosition } = useVideoPositionStore();
  const previousUrlRef = useRef(videoUrl);

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.muted = options?.muted ?? false;
  });

  useEffect(() => {
    if (previousUrlRef.current !== videoUrl) {
      previousUrlRef.current = videoUrl;
      player.replace(videoUrl);
      const resumeAt = getPosition(videoUrl);
      if (resumeAt > 0) player.currentTime = resumeAt;
      player.play();
    }
  }, [videoUrl]);

  useFocusEffect(
    useCallback(() => {
      const resumeAt = getPosition(videoUrl);
      if (resumeAt > 0) player.currentTime = resumeAt;
      player.play();

      return () => {
        try {
          savePosition(videoUrl, player.currentTime);
          player.pause();
        } catch (e) {
        }
      };
    }, [videoUrl])
  );

  return player;
}