#!/bin/bash

# Palmsure Static Site Deployment Script
echo "🚀 Building Palmsure for static deployment..."

# Build the static site
ng build --configuration production --output-mode static

echo "✅ Build complete!"
echo "📁 Static files are ready in: dist/palmsure-corp-v2/browser/"
echo ""
echo "📋 To deploy to Xneelo:"
echo "1. Upload all contents of 'dist/palmsure-corp-v2/browser/' to your Xneelo public_html folder"
echo "2. Make sure index.html is in the root directory"
echo "3. Your site will be live!"
echo ""
echo "📊 Build stats:"
echo "- Total files: $(find dist/palmsure-corp-v2/browser -type f | wc -l)"
echo "- Total size: $(du -sh dist/palmsure-corp-v2/browser | cut -f1)"
