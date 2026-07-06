import { badgePage } from '@/content/components/badge';
import { buttonPage } from '@/content/components/button';
import { cardPage } from '@/content/components/card';
import { inputPage } from '@/content/components/input';
import { designSystemPage } from '@/content/docs/design-system';
import { installationPage } from '@/content/docs/installation';
import { introductionPage } from '@/content/docs/introduction';
import { themingPage } from '@/content/docs/theming';
import type { ComponentPage, DocPage } from '@/content/types';

export const docsPages = [
  introductionPage,
  installationPage,
  themingPage,
  designSystemPage,
] satisfies DocPage[];
export const componentPages = [
  buttonPage,
  inputPage,
  cardPage,
  badgePage,
] satisfies ComponentPage[];

export const docsPagesBySlug = Object.fromEntries(
  docsPages.map((page) => [page.slug, page]),
);

export const componentPagesBySlug = Object.fromEntries(
  componentPages.map((page) => [page.slug, page]),
);
