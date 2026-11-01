$ErrorActionPreference = "Stop"

Write-Host "=== 1. Build project ===" -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "FAIL: Build failed" -ForegroundColor Red; exit 1 }

Write-Host "=== 2. Check JSON-LD (no raw stringify) ===" -ForegroundColor Cyan
$jsonCheck = Get-ChildItem dist -Recurse -Include *.html | Select-String -Pattern '^\s*\{JSON\.stringify'
if ($jsonCheck) { Write-Host "FAIL: JSON.stringify found in ld+json blocks" -ForegroundColor Red; exit 1 }
Write-Host "OK: JSON.stringify not found in ld+json" -ForegroundColor Green

Write-Host "=== 3. Check duplicate paths (404) ===" -ForegroundColor Cyan
$pathCheck = Get-ChildItem dist -Recurse -Include *.html, *.xml | Select-String 'saga/saga' -SimpleMatch
if ($pathCheck) { Write-Host "FAIL: saga/saga found" -ForegroundColor Red; exit 1 }
Write-Host "OK: No duplicate paths" -ForegroundColor Green

Write-Host "=== 4. Check NUL bytes in Markdown ===" -ForegroundColor Cyan
$mdFiles = Get-ChildItem -Recurse -Filter "*.md" src/content
foreach ($f in $mdFiles) {
    $bytes = [IO.File]::ReadAllBytes($f.FullName)
    $n = ($bytes | Where-Object { $_ -eq 0 }).Count
    if ($n -gt 0) { 
        Write-Host "FAIL: $($f.FullName) has $n NUL bytes" -ForegroundColor Red
        exit 1 
    }
}
Write-Host "OK: No NUL bytes" -ForegroundColor Green

Write-Host "=== 5. Check internal links ===" -ForegroundColor Cyan
node scripts/check-internal-links.mjs
if ($LASTEXITCODE -ne 0) { Write-Host "FAIL: Internal link errors" -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "=== ALL CHECKS PASSED ===" -ForegroundColor Green
