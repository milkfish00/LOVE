# Revalidation Setup Guide

This guide explains how to set up and use the revalidation system for your Next.js app with Sanity CMS.

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token

# Revalidation Configuration
REVALIDATE_SECRET=your_secret_key_for_revalidation

# Sanity Webhook Configuration (optional)
SANITY_WEBHOOK_SECRET=your_webhook_secret

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Revalidation Methods

### 1. Incremental Static Regeneration (ISR)

The home page is configured with ISR that revalidates every 60 seconds:

```typescript
export const revalidate = 60;
```

### 2. On-Demand Revalidation

Use the `/api/revalidate` endpoint to manually trigger revalidation:

```bash
# Revalidate specific path
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "your_secret", "path": "/"}'

# Revalidate specific tag
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "your_secret", "tag": "dynamic"}'

# Revalidate all pages
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "your_secret"}'
```

### 3. Sanity Webhooks

Configure a webhook in your Sanity Studio to automatically revalidate when content changes:

1. Go to your Sanity project settings
2. Add a webhook with URL: `https://yourdomain.com/api/webhooks/sanity`
3. Select the document types you want to trigger revalidation
4. Optionally add a secret for security

## Caching Strategy

The app uses a three-tier caching strategy:

- **Static** (1 hour): Content that rarely changes (about, programs, contact)
- **Dynamic** (5 minutes): Content that changes occasionally (home, careers)
- **Realtime** (1 minute): Content that changes frequently (gallery)

## Usage Examples

### Fetching Data with Caching

```typescript
import { fetchHomeData, fetchAboutData } from '@/app/lib/sanity-utils';

// Fetch with appropriate caching
const homeData = await fetchHomeData();
const aboutData = await fetchAboutData();
```

### Manual Revalidation

```typescript
import { revalidateContentType, revalidateAll } from '@/app/lib/sanity-utils';

// Revalidate specific content type
await revalidateContentType('dynamic');

// Revalidate all content
await revalidateAll();
```

## Security

- Always use a strong `REVALIDATE_SECRET`
- Consider adding IP whitelisting for production
- Use HTTPS in production
- Regularly rotate your secrets

## Monitoring

Monitor your revalidation endpoints for:
- Response times
- Error rates
- Cache hit rates
- Webhook delivery success

## Troubleshooting

### Common Issues

1. **Revalidation not working**: Check your secret and ensure the endpoint is accessible
2. **Webhook failures**: Verify the webhook URL and check Sanity logs
3. **Cache not updating**: Ensure the revalidation is targeting the correct paths/tags

### Debug Mode

Enable debug logging by setting:
```bash
NEXT_PUBLIC_DEBUG_REVALIDATION=true
```
