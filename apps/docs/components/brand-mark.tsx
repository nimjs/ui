export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 440 440"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="ribbon-front"
          x1="40"
          x2="381"
          y1="365"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-brand-violet)" />
          <stop offset=".48" stopColor="var(--color-brand-lavender)" />
          <stop offset="1" stopColor="var(--color-brand-blue)" />
        </linearGradient>
        <linearGradient
          id="ribbon-back"
          x1="50"
          x2="390"
          y1="64"
          y2="379"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-brand-periwinkle)" />
          <stop offset=".48" stopColor="var(--color-brand-vivid)" />
          <stop offset="1" stopColor="var(--color-brand-violet)" />
        </linearGradient>
      </defs>
      <path
        d="M83 337V130c0-37 29-66 65-66 26 0 41 12 62 35l138 152c14 15 23 29 23 51 0 37-29 66-65 66-26 0-42-12-62-35L106 181"
        stroke="url(#ribbon-back)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="66"
      />
      <path
        d="M83 337V132c0-36 29-65 65-65 25 0 43 13 62 35l138 151c15 17 23 32 23 51V103"
        stroke="url(#ribbon-front)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="55"
      />
      <path
        d="M83 337V132c0-36 29-65 65-65 25 0 43 13 62 35l138 151"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="9"
        opacity=".28"
      />
    </svg>
  );
}
