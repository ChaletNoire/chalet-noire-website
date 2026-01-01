export enum Platform {
  NTS = 'NTS',
  SOUNDCLOUD = 'SoundCloud',
  YOUTUBE = 'YouTube',
  VIMEO = 'Vimeo',
  AUDIO_SELF_HOSTED = 'Audio',
  VIDEO_SELF_HOSTED = 'Video',
  OTHER = 'other',
}

export const PlatformOptions = [
  { label: 'NTS', value: Platform.NTS },
  { label: 'SoundCloud', value: Platform.SOUNDCLOUD },
  { label: 'YouTube', value: Platform.YOUTUBE },
  { label: 'Vimeo', value: Platform.VIMEO },
  { label: 'Audio Self-Hosted', value: Platform.AUDIO_SELF_HOSTED },
  { label: 'Video Self-Hosted', value: Platform.VIDEO_SELF_HOSTED },
  { label: 'Other', value: Platform.OTHER },
]


