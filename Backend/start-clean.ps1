# start-clean.ps1
Write-Host "🧹 Nettoyage du port 3000..." -ForegroundColor Yellow

# Tuer les processus Node sur le port 3000
$processes = netstat -ano | findstr :3000
if ($processes) {
    $processes | ForEach-Object {
        $pid = ($_ -split '\s+')[-1]
        if ($pid -and $pid -ne '0') {
            taskkill /F /PID $pid 2>$null
            Write-Host "✅ Processus $pid arrêté" -ForegroundColor Green
        }
    }
}

# Supprimer le dossier dist
if (Test-Path dist) {
    Remove-Item -Recurse -Force dist
    Write-Host "✅ Dossier dist supprimé" -ForegroundColor Green
}

# Démarrer l'application
Write-Host "🚀 Démarrage de l'application..." -ForegroundColor Yellow
npm run start:dev