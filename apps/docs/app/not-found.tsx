import { Button, Card, CardContent, CardHeader, CardTitle } from '@nimjs/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-20">
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle className="font-display text-3xl">
            Page not found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>The requested page does not exist in the current docs registry.</p>
          <Button>
            <Link href="/docs/introduction">Go to introduction</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
