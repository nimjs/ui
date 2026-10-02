import { accordionPage } from '@/content/components/accordion';
import { alertPage } from '@/content/components/alert';
import { avatarPage } from '@/content/components/avatar';
import { badgePage } from '@/content/components/badge';
import { breadcrumbPage } from '@/content/components/breadcrumb';
import { buttonPage } from '@/content/components/button';
import { cardPage } from '@/content/components/card';
import { checkboxPage } from '@/content/components/checkbox';
import { collapsiblePage } from '@/content/components/collapsible';
import { dialogPage } from '@/content/components/dialog';
import { emptystatePage } from '@/content/components/empty-state';
import { fieldPage } from '@/content/components/field';
import { inputPage } from '@/content/components/input';
import { paginationPage } from '@/content/components/pagination';
import { progressPage } from '@/content/components/progress';
import { radiogroupPage } from '@/content/components/radio-group';
import { selectPage } from '@/content/components/select';
import { separatorPage } from '@/content/components/separator';
import { skeletonPage } from '@/content/components/skeleton';
import { spinnerPage } from '@/content/components/spinner';
import { switchPage } from '@/content/components/switch';
import { tabsPage } from '@/content/components/tabs';
import { textareaPage } from '@/content/components/textarea';
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
  fieldPage,
  textareaPage,
  checkboxPage,
  switchPage,
  alertPage,
  progressPage,
  separatorPage,
  skeletonPage,
  spinnerPage,
  breadcrumbPage,
  paginationPage,
  selectPage,
  radiogroupPage,
  dialogPage,
  avatarPage,
  emptystatePage,
  collapsiblePage,
  tabsPage,
  accordionPage,
] satisfies ComponentPage[];

export const docsPagesBySlug = Object.fromEntries(
  docsPages.map((page) => [page.slug, page]),
);

export const componentPagesBySlug = Object.fromEntries(
  componentPages.map((page) => [page.slug, page]),
);
