# Payload Website Template

A modern, production-ready website and CMS template built with [Payload CMS](https://payloadcms.com/) and [Next.js](https://nextjs.org/).

## Features

- **Full CMS**: Powerful admin panel, authentication, access control, and content management.
- **Next.js Frontend**: Beautiful, responsive, and production-ready website.
- **Layout Builder**: Compose unique layouts for pages and posts using reusable blocks.
- **Draft & Live Preview**: Preview content before publishing, with live editing support.
- **SEO & Search**: Built-in SEO fields and full-text search.
- **Redirects**: Manage URL redirects from the admin.
- **Jobs & Scheduled Publishing**: Schedule content to go live/unpublish at specific times.
- **Email System**: SMTP (Nodemailer) email sending for verification, password reset, and test emails, all configurable from the admin UI.
- **Theming**: Dark mode, theme provider, and customizable UI.
- **Modern Stack**: TypeScript, TailwindCSS, shadcn/ui, React Hook Form, and more.
- **Cloud Ready**: Easily deploy to Vercel with Neon Postgres and Blob storage.

## Quick Start

1. **Clone the repo**

   ```sh
   git clone <your-repo-url>
   cd <your-repo>
   ```

2. **Install dependencies**

   ```sh
   pnpm install
   ```

3. **Configure environment**  
   Copy `.env.example` to `.env` and fill in your secrets (see below).

4. **Run locally**

   ```sh
   pnpm dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to view the site and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

5. **Seed the database**  
   Log in to the admin panel and click "Seed the database" to add demo content.

## Environment Variables

- `POSTGRES_URL` - Your Postgres connection string
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token (if using)
- `PAYLOAD_SECRET` - Secret for Payload JWTs
- `CRON_SECRET` - Secret for scheduled jobs
- `PREVIEW_SECRET` - Secret for live preview
- `APP_URL` - Your app's public URL (for email links)

## Email Configuration

- Configure SMTP settings (host, port, user, pass, from address) in the admin panel under "Email Settings".
- Test email sending with the built-in test email button.

## Collections

- **Users**: Auth-enabled, manage admin and member users.
- **Posts**: Blog/news articles, draft-enabled, layout builder.
- **Pages**: Static/dynamic pages, draft-enabled, layout builder.
- **Media**: Upload and manage images, videos, and files.
- **Categories**: Taxonomy for posts.

## Advanced Features

- **Access Control**: Fine-grained permissions for collections.
- **SEO**: Meta fields and Open Graph support.
- **Search**: Full-text search for posts and pages.
- **Redirects**: Manage 301/302 redirects.
- **Jobs**: Scheduled publishing/unpublishing.
- **Theming**: Dark/light mode toggle.

## Deployment

- Deploy to [Vercel](https://vercel.com/) with one click (see badge/link in original README).
- Supports Neon Postgres and Vercel Blob storage out of the box.

## License

MIT

---

For more details, see the original [Payload Website Template documentation](https://github.com/payloadcms/payload/tree/main/templates/website).
