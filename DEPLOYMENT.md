# Auto-Deployment Setup

Your repository is now configured for **automatic deployment to Google Cloud Run** whenever you push changes to the `main` branch.

## What's Configured

✅ GitHub Actions workflow in `.github/workflows/deploy.yml`
✅ Docker containerization in `Dockerfile`
✅ Express.js server with marketplace API

## To Complete Auto-Deployment

You need to add two secrets to your GitHub repository:

### 1. **GCP_PROJECT_ID**
   - Value: `the-market-place-497513`

### 2. **GCP_SA_KEY**
   - This should be a Google Cloud Service Account key (JSON format)
   - The service account needs these permissions:
     - Cloud Run Admin
     - Service Account User
     - Cloud Build Editor

### How to Add Secrets

1. Go to your repository: https://github.com/appraaj159-bit/climate-smart-farm-game
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add `GCP_PROJECT_ID` with value `the-market-place-497513`
5. Add `GCP_SA_KEY` with your service account JSON key

## Deployment Flow

Every time you push to `main`:
1. GitHub Actions builds your Docker image
2. Pushes it to Google Container Registry
3. Deploys to Cloud Run in `us-central1`
4. Service is publicly accessible at `--allow-unauthenticated`

## How to Create a Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: `the-market-place-497513`
3. Navigate to **IAM & Admin** → **Service Accounts**
4. Click **Create Service Account**
5. Name it: `github-deploy`
6. Grant these roles:
   - Cloud Run Admin
   - Service Account User
   - Cloud Build Editor
7. Click **Create Key** (JSON format)
8. Download the JSON file and paste its contents as `GCP_SA_KEY` secret in GitHub

## Deployment URL

Once deployed, your app will be available at:
```
https://ghana-marketplace-hub-[region]-[project-id].run.app
```

The exact URL will be displayed in the GitHub Actions workflow run logs.

## Manual Deployment (Without GitHub Actions)

If you prefer to deploy manually:

```powershell
$ProjectId = "the-market-place-497513"
gcloud config set project $ProjectId
gcloud builds submit --tag gcr.io/$ProjectId/ghana-marketplace-hub
gcloud run deploy ghana-marketplace-hub `
  --image gcr.io/$ProjectId/ghana-marketplace-hub `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated
```

## Local Development

### Start the server:
```bash
npm run start
```
Then open http://localhost:3000

### Or run static version (no server):
```bash
npm run start:static
```
Then open http://localhost:8080

---

**Repository:** https://github.com/appraaj159-bit/climate-smart-farm-game
**Project:** the-market-place-497513
