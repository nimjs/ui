'use client';

import type { RegistryComponentName } from '@nimjs/registry';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  Textarea,
  Checkbox,
  Switch,
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  Separator,
  Skeleton,
  Spinner,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Pagination,
  PaginationList,
  PaginationItem,
  PaginationLink,
  Select,
  RadioGroup,
  RadioGroupItem,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Avatar,
  AvatarFallback,
  AvatarImage,
  EmptyState,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@nimjs/ui';

type PreviewId = RegistryComponentName;

export function ComponentPreview({ preview }: { preview: PreviewId }) {
  switch (preview) {
    case 'button':
      return (
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button loading>Saving</Button>
          <Button disabled>Unavailable</Button>
        </div>
      );
    case 'input':
      return (
        <div className="w-full max-w-md space-y-4">
          <Field description>
            <FieldLabel>Email</FieldLabel>
            <FieldControl>
              <Input type="email" placeholder="team@example.com" />
            </FieldControl>
            <FieldDescription>Use your work address.</FieldDescription>
          </Field>
          <Field error invalid>
            <FieldLabel>Username</FieldLabel>
            <FieldControl>
              <Input defaultValue="taken" />
            </FieldControl>
            <FieldError>This username is taken.</FieldError>
          </Field>
        </div>
      );
    case 'card':
      return (
        <Card className="max-w-lg bg-card">
          <CardHeader>
            <CardTitle>Release candidate</CardTitle>
            <CardDescription>
              A card can compose product copy, actions, and status content.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Keep card primitives simple so contributors can read, change, and
            extend them without hidden runtime behavior.
          </CardContent>
          <CardFooter>
            <Button size="sm">Ship</Button>
            <Button size="sm" variant="outline">
              Review
            </Button>
          </CardFooter>
        </Card>
      );
    case 'badge':
      return (
        <div className="flex flex-wrap gap-3">
          <Badge>Stable</Badge>
          <Badge variant="secondary">Community</Badge>
          <Badge variant="accent">Preview</Badge>
          <Badge variant="outline">Open Source</Badge>
          <Badge variant="destructive">Action needed</Badge>
        </div>
      );
    case 'field':
      return (
        <Field description error invalid className="w-full max-w-sm">
          <FieldLabel>Email</FieldLabel>
          <FieldControl>
            <Input type="email" defaultValue="invalid" />
          </FieldControl>
          <FieldDescription>Use your work address.</FieldDescription>
          <FieldError>Enter a valid email address.</FieldError>
        </Field>
      );
    case 'textarea':
      return (
        <div className="w-full max-w-sm">
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <Textarea id="message" placeholder="Write a message" />
        </div>
      );
    case 'checkbox':
      return (
        <div className="flex items-center gap-2">
          <Checkbox id="updates" defaultChecked />
          <label htmlFor="updates">Send updates</label>
        </div>
      );
    case 'switch':
      return (
        <div className="flex items-center gap-2">
          <Switch id="notifications" defaultChecked />
          <label htmlFor="notifications">Notifications</label>
        </div>
      );
    case 'select':
      return (
        <div className="w-full max-w-sm space-y-2">
          <label htmlFor="region" className="block text-sm font-medium">
            Region
          </label>
          <Select id="region" defaultValue="eu">
            <optgroup label="Available">
              <option value="eu">Europe</option>
              <option value="us">United States</option>
            </optgroup>
            <option value="ap" disabled>
              Asia Pacific
            </option>
          </Select>
        </div>
      );
    case 'radio-group':
      return (
        <RadioGroup defaultValue="basic">
          <legend className="text-sm font-medium">Plan</legend>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="basic-plan" value="basic" />
            <label htmlFor="basic-plan">Basic</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="pro-plan" value="pro" />
            <label htmlFor="pro-plan">Pro</label>
          </div>
        </RadioGroup>
      );
    case 'dialog':
      return (
        <Dialog>
          <DialogTrigger className="rounded-[var(--radius-md)] bg-primary px-4 py-2 text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Open settings
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Update your preferences.</DialogDescription>
            <DialogClose className="mt-6 rounded-[var(--radius-md)] border border-border px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Done
            </DialogClose>
          </DialogContent>
        </Dialog>
      );
    case 'avatar':
      return (
        <div className="flex items-center gap-3">
          <Avatar aria-label="Ada Lovelace">
            <AvatarFallback>AL</AvatarFallback>
            <AvatarImage src="data:image/png;base64,broken" alt="" />
          </Avatar>
          <Avatar aria-label="Grace Hopper">
            <AvatarFallback>GH</AvatarFallback>
          </Avatar>
        </div>
      );
    case 'empty-state':
      return (
        <EmptyState className="w-full max-w-sm">
          <EmptyStateTitle>No projects yet</EmptyStateTitle>
          <EmptyStateDescription>
            Create a project to start organizing your work.
          </EmptyStateDescription>
          <EmptyStateActions>
            <Button size="sm">Create project</Button>
          </EmptyStateActions>
        </EmptyState>
      );
    case 'collapsible':
      return (
        <Collapsible className="w-full max-w-sm" defaultOpen>
          <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
          <CollapsibleContent>
            Choose additional options here.
          </CollapsibleContent>
        </Collapsible>
      );
    case 'alert':
      return (
        <Alert className="max-w-sm">
          <AlertTitle>Changes saved</AlertTitle>
          <AlertDescription>Your settings are now up to date.</AlertDescription>
        </Alert>
      );
    case 'tabs':
      return (
        <Tabs className="w-full max-w-sm" defaultValue="overview">
          <TabsList aria-label="Project views">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Project summary</TabsContent>
          <TabsContent value="activity">Recent changes</TabsContent>
        </Tabs>
      );
    case 'progress':
      return (
        <Progress
          value={65}
          aria-label="Upload progress"
          className="max-w-sm"
        />
      );
    case 'accordion':
      return (
        <Accordion
          className="w-full max-w-sm"
          type="single"
          defaultValue="billing"
        >
          <AccordionItem value="billing">
            <AccordionTrigger>Billing</AccordionTrigger>
            <AccordionContent>Manage payment methods.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="team">
            <AccordionTrigger>Team</AccordionTrigger>
            <AccordionContent>Manage members.</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    case 'separator':
      return (
        <div className="w-full max-w-sm space-y-3">
          <p>First section</p>
          <Separator />
          <p>Second section</p>
        </div>
      );
    case 'skeleton':
      return (
        <div className="w-full max-w-sm space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      );
    case 'spinner':
      return <Spinner label="Loading preview" />;
    case 'breadcrumb':
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    case 'pagination':
      return (
        <Pagination>
          <PaginationList>
            <PaginationItem>
              <PaginationLink href="?page=1">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="?page=2" isCurrent>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="?page=3">3</PaginationLink>
            </PaginationItem>
          </PaginationList>
        </Pagination>
      );
    default:
      return null;
  }
}
