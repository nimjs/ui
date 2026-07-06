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
} from '@nimjs/ui';

type PreviewId = 'button' | 'input' | 'card' | 'badge';

export function ComponentPreview({ preview }: { preview: PreviewId }) {
  switch (preview) {
    case 'button':
      return (
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      );
    case 'input':
      return (
        <div className="max-w-md space-y-3">
          <label
            className="block text-sm font-medium text-foreground"
            htmlFor="email"
          >
            Email
          </label>
          <Input id="email" placeholder="team@example.com" type="email" />
          <p className="text-sm text-muted-foreground">
            Inputs inherit semantic focus styles from the theme layer.
          </p>
        </div>
      );
    case 'card':
      return (
        <Card className="max-w-lg bg-white">
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
        </div>
      );
    default:
      return null;
  }
}
