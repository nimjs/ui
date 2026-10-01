import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  buttonVariants,
} from '@nimjs/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-20">
      <Card className="w-full bg-card">
        <CardHeader>
          <CardTitle className="font-display text-3xl">
            Page not found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>The requested page does not exist in the current docs registry.</p>
          <Link
            className={buttonVariants({ variant: 'primary' })}
            href="/docs/introduction"
          >
            Go to introduction
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
