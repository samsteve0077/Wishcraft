let currentAudio = null;

export function stopAudio() {
  if (!currentAudio) return;

  currentAudio.pause();
  currentAudio.currentTime = 0;

  currentAudio = null;
}

export function pauseAudio() {
  if (!currentAudio) return;

  currentAudio.pause();
}

export function playAudio(src, options = {}) {

  const {
    loop = false,
    volume = 1,
    onEnded,
  } = options;

  stopAudio();

  currentAudio = new Audio(src);

  currentAudio.loop = loop;
  currentAudio.volume = volume;

  currentAudio.play();

  currentAudio.onended = () => {

    if (onEnded) {
      onEnded();
    }

  };

  return currentAudio;

}

export function getCurrentAudio() {
  return currentAudio;
}