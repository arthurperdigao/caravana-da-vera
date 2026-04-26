@echo off
echo Subindo correcoes para o GitHub...
git add .
git commit -m "Fix: Full cloud migration for images and database"
git push
echo Concluido!
