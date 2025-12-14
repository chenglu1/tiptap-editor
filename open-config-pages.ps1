# Open all configuration pages

Write-Host "Opening configuration pages..." -ForegroundColor Cyan
Write-Host ""

# Open Vercel Tokens page
Write-Host "1. Opening Vercel Tokens page..." -ForegroundColor Yellow
Start-Process "https://vercel.com/account/tokens"
Start-Sleep -Seconds 1

# Open GitHub Secrets page
Write-Host "2. Opening GitHub Secrets page..." -ForegroundColor Yellow
Write-Host "   Note: Replace 'chenglu1' with your GitHub username if needed" -ForegroundColor Gray
$githubUrl = "https://github.com/chenglu1/tiptap-editor/settings/secrets/actions"
Start-Process $githubUrl
Start-Sleep -Seconds 1

# Open GitHub Actions page
Write-Host "3. Opening GitHub Actions page..." -ForegroundColor Yellow
$actionsUrl = "https://github.com/chenglu1/tiptap-editor/actions"
Start-Process $actionsUrl

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "All pages opened!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Configuration steps:" -ForegroundColor Cyan
Write-Host "1. Create Token in Vercel Tokens page" -ForegroundColor White
Write-Host "2. Add 3 Secrets in GitHub Secrets page" -ForegroundColor White
Write-Host "3. Test deployment in GitHub Actions page" -ForegroundColor White
Write-Host ""
Write-Host "Detailed guide: DEPLOY.md" -ForegroundColor Yellow

