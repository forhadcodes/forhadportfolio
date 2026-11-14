import type { Project } from "@/types";

/**
 * All project content lives here. Components never hard-code project text.
 *
 * Screenshots: run `npm run screenshots` (see scripts/capture-screenshots.mjs)
 * or drop your own files into /public/projects using the same names.
 */
export const projects: Project[] = [
  {
    slug: "studiospace",
    title: "StudioSpace",
    featured: true,
    tagline:
      "A peer-to-peer marketplace where creators discover and book studios, and owners list their creative spaces.",
    description:
      "StudioSpace is a marketplace for filmmakers, photographers, podcasters and musicians. Studio owners list their spaces, from photography cyc walls and sound stages to podcast lounges and recording suites, and creators discover, filter and book them with transparent pricing and real-time booking management.",
    features: [
      "Dynamic home page: Swiper hero slider, six featured studios fetched from MongoDB, category cards that open the explore page pre-filtered, a \"How Booking Works\" section and a Host Guarantee section",
      "Explore and filter studios by category, price range and sort order, with friendly empty states",
      "Full studio CRUD through private routes: image upload, amenity tags and confirmation modals before deletion",
      "Booking system with a Pending → Confirmed → Completed / Cancelled status flow; pending bookings can be cancelled from My Bookings",
      "Double-booking prevention: the server checks time overlap against existing Confirmed bookings and rejects collisions with a clear error",
      "Secure authentication with Better Auth (email/password and Google), JWT in HTTPOnly cookies, and protected mutations that return 401 Unauthorized",
      "Light and dark theme toggle across the whole interface",
      "Toast notifications, custom modal dialogs and branded skeleton loaders",
      "Responsive on mobile, tablet and desktop, with a custom 404 page",
      "Optional extras: PDF booking invoice for confirmed bookings and a saved-studios wishlist",
    ],
    highlights: [
      "Double-booking prevention",
      "HTTPOnly JWT auth",
      "Full CRUD",
      "Light / dark theme",
    ],
    techStack: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn / Base UI",
      "Better Auth",
      "MongoDB Atlas",
      "Swiper.js",
      "Embla Carousel",
      "Sonner",
      "Vercel",
    ],
    liveUrl: "https://studiospace-client-beta-olive.vercel.app",
    githubLinks: [
      { label: "GitHub client", url: "https://github.com/forhadcodes/studiospace" },
      {
        label: "GitHub server",
        url: "https://github.com/forhadcodes/studiospace-server",
      },
    ],
    screenshots: [
      {
        src: "/projects/studiospace-1.png",
        alt: "StudioSpace home page with dark hero slider, navbar and Most Popular Studio card",
      },
      {
        src: "/projects/studiospace-2.png",
        alt: "StudioSpace explore page with search, category chips and studio listing cards",
      },
      {
        src: "/projects/studiospace-3.png",
        alt: "StudioSpace My Bookings page with pending bookings and cancel actions",
      },
    ],
    caseStudy: {
      problem:
        "Creators need flexible access to photography, podcast, music and film spaces, while studio owners have idle hours they could monetize. Arranging that by message or phone leads to unclear pricing and double-booked slots.",
      solution:
        "A two-sided marketplace. Owners list spaces with galleries, amenities and hourly pricing. Creators filter, compare and book with transparent pricing and a clear status flow, while the server guarantees no two confirmed bookings overlap.",
      role: "Built end to end as a single full-stack Next.js app: UI and responsive layouts, API routes, the MongoDB data layer, authentication, booking logic and deployment to Vercel.",
      techDecisions: [
        {
          title: "One full-stack Next.js app",
          body: "The client and the /api routes live in a single repository and deploy together on Vercel, which means fewer moving parts and one place to ship from.",
        },
        {
          title: "Better Auth + MongoDB adapter, JWT in HTTPOnly cookies",
          body: "Session tokens stay out of reach of client-side JavaScript, and every mutating endpoint answers 401 Unauthorized when the request isn't authenticated.",
        },
        {
          title: "MongoDB Atlas",
          body: "Flexible documents fit studios (amenities, images, pricing) and bookings (time ranges, status) without heavy schema ceremony.",
        },
        {
          title: "Tailwind CSS v4 with shadcn / Base UI",
          body: "Accessible, themeable building blocks that made the light and dark themes and consistent modals and toasts straightforward.",
        },
      ],
      challenges: [
        {
          title: "Double bookings",
          difficulty:
            "Two creators could request the same slot at the same time, and a check on the client couldn't be trusted — by the time the response came back, someone else could have booked the same hours.",
          solution:
            "My approach was to move the guarantee to the server: before a booking is confirmed, the API compares the requested time range against every existing Confirmed booking for that studio, and any overlap is rejected with a clear error message. A slot can never be sold twice.",
        },
        {
          title: "Securing every mutation",
          difficulty:
            "Studio and booking endpoints could be called directly with tools like Postman, so hiding buttons in the UI wasn't protection — unauthenticated or non-owner requests could still reach the data layer.",
          solution:
            "I gated every mutating endpoint behind Better Auth's session (JWT in HTTPOnly cookies): no valid session gets a 401 Unauthorized, and studio edits are limited to the owner with an ownership check on the server, not in the browser.",
        },
        {
          title: "Feedback that never leaves users guessing",
          difficulty:
            "In early builds, auth, CRUD and booking actions could fail silently — users clicked \"Book\" and had no idea whether it worked, especially on slow connections.",
          solution:
            "My approach: every action reports back through a toast, destructive actions ask for confirmation in a modal first, and skeleton loaders cover data fetching so waiting always feels intentional rather than broken.",
        },
      ],
      outcome:
        "A complete marketplace flow, from listing and discovery to booking and management, covering all the core requirements plus optional extras like PDF invoices and a wishlist. It deepened my practice with secure auth, server-side validation and data modelling.",
    },
  },
  {
    slug: "bazardor",
    title: "BazarDor",
    localizedTitle: "বাজার দর",
    tagline:
      "A fully responsive, Bengali-localized web app for tracking daily commodity prices, market trends and bazaar-by-bazaar comparisons.",
    description:
      "BazarDor monitors and tracks daily commodity market prices. Users check daily price updates, see which items rose or fell, compare prices across specific bazaars and filter items efficiently, all localized with Bengali support.",
    features: [
      "Infinite price ticker (marquee) under the navbar showing daily products, prices in Bengali digits and ▲/▼ % indicators",
      "Automated market trend sections: Top 6 risers and Top 6 fallers of the day",
      "Advanced sorting (default, price low to high, price high to low) that handles Bengali numerals by numeric value rather than string order",
      "Protected product details at /product/[slug] with localized summaries, tags and a bazaar-by-bazaar comparison of minimum, maximum and average prices",
      "Authentication with Better Auth (email/password, Google, GitHub), route protection with toast redirects, and a live profile editor",
    ],
    highlights: [
      "100% responsive",
      "Bengali numeral sorting",
      "Skeleton loaders",
      "Custom 404",
      "8+ clean commits",
    ],
    techStack: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI / Hero UI",
      "Better Auth",
      "React Hot Toast",
      "Vercel",
    ],
    liveUrl: "https://bazar-dor-nine-smoky.vercel.app",
    githubLinks: [
      { label: "GitHub repository", url: "https://github.com/forhadcodes/bazar-dor" },
    ],
    screenshots: [
      {
        src: "/projects/bazardor-1.png",
        alt: "BazarDor home page with Bengali hero, category navigation and daily price ticker",
      },
      {
        src: "/projects/bazardor-2.png",
        alt: "BazarDor rice price listing with district filter and per-product price cards",
      },
      {
        src: "/projects/bazardor-3.jpg",
        alt: "BazarDor responsive design mockup shown on desktop, tablet and mobile",
      },
    ],
    caseStudy: {
      problem:
        "Commodity prices change daily and differ from bazaar to bazaar, which makes it hard for everyday buyers to tell whether a price is fair, especially in tools that aren't built for Bengali-speaking users.",
      solution:
        "BazarDor brings daily prices, the biggest risers and fallers, and bazaar-by-bazaar comparisons into one fast, fully Bengali-localized interface, with a live ticker for a quick overview and filters and sorting for a closer look.",
      role: "Designed and built the whole application on my own: UI and responsive layouts, routing, authentication, loading and error states, and deployment to Vercel.",
      techDecisions: [
        {
          title: "Next.js App Router",
          body: "Server-side rendering and client routing in one framework, including protected dynamic routes like /product/[slug].",
        },
        {
          title: "Better Auth",
          body: "Email/password plus Google and GitHub sign-in without hand-rolling session security, with redirects and toast feedback for protected pages.",
        },
        {
          title: "Tailwind CSS with DaisyUI / Hero UI",
          body: "Utility-first styling with ready-made components, so the effort went into product logic and responsive polish.",
        },
      ],
      challenges: [
        {
          title: "Sorting Bengali numerals",
          difficulty:
            "Prices are displayed in Bengali digits (১৪৮, ৯৯…), so the default string sort returned the wrong order — ৯৮ sorted above ১৪৮ because of how the characters compare as text.",
          solution:
            "My approach was to write a converter that maps every Bengali numeral to its real number before the comparison runs, so \"price low to high\" always sorts by actual value, never by string order.",
        },
        {
          title: "Dynamic routes on refresh",
          difficulty:
            "Refreshing or sharing a /product/[slug] link after deployment ended in a hard 404 on Vercel, because the dynamic route wasn't resolved on direct requests — the page only worked after navigating from home.",
          solution:
            "I set the dynamic [slug] route up for server-side resolution with generateStaticParams, so a refresh or a shared link always renders the product page instead of a dead end.",
        },
        {
          title: "Perceived performance",
          difficulty:
            "The initial price dataset took a noticeable moment to arrive, leaving users staring at a blank page and wondering whether the app had broken.",
          solution:
            "My approach: layout skeletons with a shimmer animation appear instantly while data loads, and a custom 404 page offers a clear way back to the home page instead of a dead end.",
        },
      ],
      outcome:
        "A deployed, fully responsive app with authenticated product pages, a live profile editor and a clean history of 8+ readable commits. It strengthened my App Router routing, auth flows and handling of non-Latin numeral systems.",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return projects[(i + 1) % projects.length];
}
