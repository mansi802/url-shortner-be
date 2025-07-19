# Deployment Guide for Vercel

## Prerequisites

1. Make sure you have a Vercel account
2. Install Vercel CLI: `npm i -g vercel`
3. Ensure your MongoDB database is accessible from the internet

## Environment Variables to Set in Vercel

You'll need to set these environment variables in your Vercel project settings:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
BACKEND_URL=https://your-frontend-domain.vercel.app
COOKIE_SECRET=your_cookie_secret
```

**Note:** Make sure to use `MONGODB_URI` (not `MONGO_URI`) as the environment variable name.

## Deployment Steps

1. **Login to Vercel CLI:**

   ```bash
   vercel login
   ```

2. **Deploy your project:**

   ```bash
   vercel
   ```

3. **For production deployment:**
   ```bash
   vercel --prod
   ```

## Important Notes

- Make sure your MongoDB connection string is accessible from Vercel's servers
- Update the `BACKEND_URL` in your environment variables to match your frontend domain
- The application will be deployed as serverless functions
- Each API route will be available at `https://your-project.vercel.app/route-name`

## Troubleshooting

- If you encounter CORS issues, make sure your `BACKEND_URL` environment variable is set correctly
- Ensure your MongoDB Atlas cluster allows connections from all IP addresses (0.0.0.0/0) or specifically from Vercel's IP ranges
- Check Vercel function logs for any database connection issues
