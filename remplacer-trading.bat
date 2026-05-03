@echo off
chcp 65001 >nul

echo ==========================================
echo Remplacement complet du dépôt trading
echo Source locale : C:\xampp\htdocs\trading
echo Dépôt GitHub : https://github.com/ehk0705/trading.git
echo Site publié : https://ehk0705.github.io/trading/
echo ==========================================
echo.

cd /d C:\xampp\htdocs

echo Suppression de l'ancien dossier temporaire trading-github s'il existe...
if exist trading-github (
    rmdir /S /Q trading-github
)

echo.
echo Clonage du dépôt GitHub trading...
git clone https://github.com/ehk0705/trading.git trading-github

if errorlevel 1 (
    echo.
    echo ERREUR : impossible de cloner le dépôt.
    echo Vérifie que le dépôt existe bien ici :
    echo https://github.com/ehk0705/trading
    echo.
    pause
    exit /b 1
)

echo.
echo Suppression complète du contenu du dépôt cloné...
cd /d C:\xampp\htdocs\trading-github

for /d %%D in (*) do (
    rmdir /S /Q "%%D"
)

for %%F in (*) do (
    del /F /Q "%%F"
)

echo.
echo Copie des fichiers locaux vers le dépôt GitHub...
xcopy C:\xampp\htdocs\trading . /E /I /Y

if errorlevel 1 (
    echo.
    echo ERREUR : problème pendant la copie.
    pause
    exit /b 1
)

echo.
echo Ajout des fichiers dans Git...
git add .

echo.
echo Création du commit...
git commit -m "Remplacement complet du projet trading"

echo.
echo Envoi vers GitHub...
git branch -M main
git push origin main

if errorlevel 1 (
    echo.
    echo ERREUR : le push vers GitHub a échoué.
    echo Vérifie ton identifiant GitHub ou ton jeton d'accès.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo Opération terminée.
echo Vérifie le site :
echo https://ehk0705.github.io/trading/
echo ==========================================
echo.

pause