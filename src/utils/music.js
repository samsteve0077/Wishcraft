export const formatDuration = (seconds = 0) => {
  const safeSeconds = Number.isFinite(Number(seconds)) ? Math.max(0, Number(seconds)) : 0;
  const total = Math.floor(safeSeconds);
  const minutes = Math.floor(total / 60);
  const remainder = total % 60;

  return `${minutes.toString().padStart(2, "0")}:${remainder
    .toString()
    .padStart(2, "0")}`;
};

export const parseDurationString = (value) => {
  if (value == null || value === "") return 0;

  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, value);
  }

  const normalized = String(value).trim();
  const match = normalized.match(/^(\d+):(\d{1,2})$/);

  if (!match) return 0;

  const [, minutes, seconds] = match;
  return Number(minutes) * 60 + Number(seconds);
};

export const getTrimDuration = (trim) => {
  if (!trim || !Number.isFinite(Number(trim.start)) || !Number.isFinite(Number(trim.end))) {
    return 0;
  }

  const start = Number(trim.start);
  const end = Number(trim.end);

  if (end <= start) return 0;

  return Math.max(0, end - start);
};

export const getSongDurationSeconds = (song) => {
  if (!song) return 0;

  const explicitSeconds = Number(song.durationSeconds ?? song.duration ?? 0);

  if (Number.isFinite(explicitSeconds) && explicitSeconds > 0) {
    return explicitSeconds;
  }

  return parseDurationString(song.duration);
};

export const getSongDisplayDuration = (song) => {
  const trimmedDuration = getTrimDuration(song?.trim);
  const durationSeconds = getSongDurationSeconds(song);

  if (song?.trim && trimmedDuration > 0) {
    return formatDuration(trimmedDuration);
  }

  return formatDuration(durationSeconds);
};

export const normalizeTrim = (trim, duration = 0) => {
  if (!trim || !Number.isFinite(Number(trim.start)) || !Number.isFinite(Number(trim.end))) {
    return {
      start: 0,
      end: Math.max(0, duration),
    };
  }

  const maxDuration = Math.max(0, Number(duration) || 0);
  const start = Math.max(0, Math.min(Number(trim.start), maxDuration || Number(trim.end) || 0));
  const end = Math.max(start + 0.1, Math.min(Number(trim.end), maxDuration || Number(trim.end) || 0));

  if (maxDuration > 0 && end > maxDuration) {
    return {
      start,
      end: maxDuration,
    };
  }

  return {
    start,
    end,
  };
};

export const getPlaybackRange = (song) => {
  if (!song) return null;

  if (song.trim && Number(song.trim.end) > Number(song.trim.start)) {
    return {
      start: Math.max(0, Number(song.trim.start)),
      end: Math.max(Number(song.trim.start), Number(song.trim.end)),
    };
  }

  return null;
};
