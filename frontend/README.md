# Ebra

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

## Included

- State management with [zustand](https://zustand.surge.sh/)
- Search parameters management [nuqs](https://nuqs.47ng.com/)
- Data asynchronous state management [react-query](https://react-query.tanstack.com/)

## Project structure

- `app` - Contains pages
- `public` - Contains static files
- `srct/` - Contains the main application code
    - `components/` - Contains all the components
    - `hooks/` - Contains all the hooks
    - `stores/` - Contains all the store
    - `models/` - Contains all the models
    - `lib/` - Contains all the libs
