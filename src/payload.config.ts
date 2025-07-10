import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { authPlugin } from 'payload-auth-plugin'
import { GitHubAuthProvider, GoogleAuthProvider } from 'payload-auth-plugin/providers'
import sharp from 'sharp' // sharp-import
import { fileURLToPath } from 'url'
// import { resendAdapter } from '@payloadcms/email-resend'

import { defaultLexical } from '@/fields/defaultLexical'

import { Accounts } from './collections/Accounts'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { AdminUsers } from './collections/Auth/Admin/Users'
import { AdminAccounts } from './collections/Auth/Admin/Accounts'
import { AppUsers } from './collections/Auth/App/Users'
import { AppAccounts } from './collections/Auth/App/Accounts'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      afterLogin: ['@/components/AfterLogin/index#AdminLogin'],
      views: {
        login: {
          Component: '@/views/AdminLogin/index#AdminLoginView',
          path: '/auth/signin',
        },
      },
      // The `BeforeMember` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeMember'],
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: AdminUsers.slug,
    // user: Users.slug, change uset to single user
    livePreview: {
      breakpoints: [
        {
          height: 667,
          label: 'Mobile',
          name: 'mobile',
          width: 375,
        },
        {
          height: 1024,
          label: 'Tablet',
          name: 'tablet',
          width: 768,
        },
        {
          height: 900,
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
        },
      ],
    },
  },
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Accounts,
    AdminUsers,
    AdminAccounts,
    AppUsers,
    AppAccounts,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  email: nodemailerAdapter({
    defaultFromAddress: 'info@payloadcms.com',
    defaultFromName: 'Payload',
    // Nodemailer transportOptions
    transportOptions: {
      auth: {
        pass: process.env.SMTP_PASS,
        user: process.env.SMTP_USER,
      },
      host: process.env.SMTP_HOST,
      port: 587,
    },
  }),
  globals: [Header, Footer],
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
    authPlugin({
      accountsCollectionSlug: Accounts.slug,
      allowOAuthAutoSignUp: true,
      errorRedirectPath: '/admin/auth/signin',
      name: 'admin', // must be unique
      providers: [
        GoogleAuthProvider({
          client_id: process.env.GOOGLE_CLIENT_ID as string,
          client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubAuthProvider({
          client_id: process.env.GIT_CLIENT_ID as string,
          client_secret: process.env.GIT_CLIENT_SECRET as string,
        }),
      ],
      useAdmin: true, // not mandatory, and only use this for admin
      successRedirectPath: '/admin/collections',
      usersCollectionSlug: Users.slug,
    }),
  ],
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
