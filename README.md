# DoughFlowNext
_README.md
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Directories

All files used by node live in the "frontend" directory  

app/api- Any Django API settings or interactable functions live here    

app/components- All JS components live in here   

app/layouts- RootLayout and custom page layouts   

app/pages- All pages for app   

app/styles- Any globally applied styles or css files  

public/- Files that can be loaded directly to the root directory of NextJS app

node_modules/- dependencies from NextJS, additional installs are listed here
    -N/A

configuration files- any misc file found in root directory (./frontend)  
    -"next-env.d.ts" TypeScript declarations for NextJS env  
    -"next.config.mjs" Middleware for the NextJS build process  
    -"package.json" metadata on project and dependencies  
    -"package-lock.json" records of versioning for dependencies  
    -"postcss.config.js"  
    -"tsconfig.json" TypeScript compiler and configuration options  
    -"tailwind.config.ts" Tailwind CSS customization and configuration options  

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
