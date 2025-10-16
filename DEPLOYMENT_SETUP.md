# 🚀 Palmsure Deployment Setup Guide

## GitHub Actions + Xneelo Automated Deployment

This guide will help you set up automated deployment from GitHub to Xneelo hosting.

## 📋 What You Need to Do in Xneelo

### 1. Get Your FTP Credentials
1. **Login to your Xneelo control panel**
2. **Go to "FTP Accounts"** or "File Manager"
3. **Note down these details:**
   - FTP Server (e.g., `ftp.yourdomain.com` or IP address)
   - FTP Username
   - FTP Password
   - Port (usually 21)

### 2. Set Up GitHub Secrets
1. **Go to your GitHub repository**: https://github.com/HunchoKing/Palmsure
2. **Click "Settings"** tab
3. **Click "Secrets and variables"** → **"Actions"**
4. **Click "New repository secret"** and add these:

```
Name: XNEELO_FTP_SERVER
Value: your-ftp-server-address

Name: XNEELO_FTP_USERNAME  
Value: your-ftp-username

Name: XNEELO_FTP_PASSWORD
Value: your-ftp-password
```

## 🔄 How It Works

1. **Push code to GitHub** → Triggers automatic build
2. **GitHub builds** the Angular static site
3. **GitHub uploads** files to Xneelo via FTP
4. **Your website updates** automatically! 🎉

## 🎯 What Gets Deployed

- ✅ **All static files** from `dist/palmsure-corp-v2/browser/`
- ✅ **web.config** for proper Angular routing
- ✅ **All assets** (images, fonts, etc.)
- ✅ **12 prerendered pages** (home, about, services, etc.)

## 🚀 Testing the Deployment

1. **Make a small change** to any file
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```
3. **Check GitHub Actions** tab to see the deployment progress
4. **Visit your website** to see the changes!

## 🛠️ Manual Deployment (Backup)

If you need to deploy manually:
```bash
# Build the site
ng build --configuration production --output-mode static

# Upload contents of dist/palmsure-corp-v2/browser/ to Xneelo
```

## 📞 Need Help?

- **GitHub Actions logs**: Check the "Actions" tab in your repository
- **Xneelo support**: Contact them for FTP issues
- **Website issues**: Check browser console for errors

---
**Footer Updated**: Now shows "Developed by coderom.co.za - berrydeep project" ✅
