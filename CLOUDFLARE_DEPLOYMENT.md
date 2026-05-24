# Cloudflare Pages Configuration

## Deployment Guide for CyberEden (nazrOS)

### Prerequisites
- Cloudflare account
- GitHub repository with project code
- Node.js 18+ installed locally

### Step-by-Step Deployment

#### 1. Prepare Your GitHub Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "CyberEden v1.1.0 - Enhanced with dashboard filters, profile assets, and new events"
git branch -M main
git remote add origin https://github.com/yourusername/cybereden.git
git push -u origin main
```

#### 2. Connect to Cloudflare Pages

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages**
3. Click **Create a project**
4. Select **Connect to Git**
5. Authorize Cloudflare to access your GitHub account
6. Select your repository: `cybereden`
7. Click **Begin setup**

#### 3. Configure Build Settings

**Project name:** `cybereden` (or your preferred name)

**Production branch:** `main`

**Build command:** 
```
npm install && npm run build
```

**Build output directory:** 
```
dist
```

**Root directory (leave blank if project is at repository root):** 
(leave empty)

#### 4. Environment Variables (Optional)

If you need environment variables, add them under:
- **Settings** → **Environment variables**

Example variables:
```
VITE_API_URL=https://api.yourdomain.com
VITE_ENVIRONMENT=production
```

#### 5. Deploy

Click **Save and Deploy**

Cloudflare will automatically:
- Pull your code from GitHub
- Install dependencies
- Run the build command
- Deploy to your Pages domain

### Deployment URL

Your project will be deployed to:
```
https://cybereden.pages.dev
```

### Custom Domain

To use a custom domain:

1. Go to **Settings** → **Custom domain**
2. Enter your domain (e.g., `cybereden.yourdomain.com`)
3. Follow DNS configuration instructions
4. Update your domain's DNS records to point to Cloudflare

### Automatic Deployments

Every time you push to the `main` branch:
- Cloudflare automatically triggers a build
- Code is compiled and deployed
- Previous versions are preserved in deployment history

### Manual Redeploy

If you need to redeploy without making changes:

1. Go to **Deployments**
2. Find the deployment you want to redeploy
3. Click the **three dots** menu
4. Select **Retry deployment**

### Monitoring Deployments

- **Deployments tab**: See all deployments with timestamps
- **Build logs**: Click on any deployment to view build logs
- **Analytics**: Monitor performance and traffic patterns

### Rollback to Previous Deployment

1. Go to **Deployments**
2. Find the deployment to rollback to
3. Click the **three dots** menu
4. Select **Rollback to this deployment**

### Troubleshooting

#### Build Failed

1. Check build logs for error messages
2. Common issues:
   - Missing dependencies: `npm install`
   - TypeScript errors: `npm run build` locally
   - Wrong output directory: Check `vite.config.ts`

#### Static Files Not Loading

- Ensure all assets are in the `public/` directory
- Check import paths in components
- Images should use relative paths or import statements

#### Environment Variables Not Working

1. Verify variable names match in code
2. Redeploy after adding/changing variables
3. Use `VITE_` prefix for Vite client-side variables

#### Performance Issues

1. Use Cloudflare Analytics
2. Enable compression in Cloudflare settings
3. Consider caching rules for static assets

### Local Build Testing

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

Visit `http://localhost:5173` (or shown URL) to test.

### Git Workflow

```bash
# Create a feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create a Pull Request on GitHub
# After review and merge to main, Cloudflare auto-deploys
```

### Performance Optimization

Cloudflare Pages automatically:
- Minifies CSS and JavaScript
- Optimizes images
- Caches static assets globally
- Uses Gzip compression
- Serves from edge locations worldwide

### Security

Cloudflare Pages provides:
- HTTPS (automatic)
- DDoS protection
- Bot filtering (optional)
- WAF (Web Application Firewall)

Enable in Cloudflare Security settings.

### Further Documentation

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vite Deployment Guides](https://vitejs.dev/guide/static-deploy.html#cloudflare-pages)
- [TanStack Router Docs](https://tanstack.com/router/latest)

---

**Quick Deployment Checklist:**
- [ ] Code committed to GitHub main branch
- [ ] GitHub repository is public or Cloudflare has access
- [ ] Cloudflare Pages project created
- [ ] Build command: `npm install && npm run build`
- [ ] Build output directory: `dist`
- [ ] Environment variables set (if needed)
- [ ] Domain configured (if custom domain)
- [ ] First deployment triggered and successful

**Deployment Status:** Ready for Production ✅
