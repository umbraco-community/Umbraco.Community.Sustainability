export const manifests = [
  {
    type: 'localization' as const,
    alias: 'Umbraco.Community.Sustainability.Localization.En',
    name: 'Sustainability English Localization',
    meta: { culture: 'en' },
    js: () => import('./en.ts'),
  },
];
