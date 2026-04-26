@echo off
title Sistema da Caravana da Vera
echo ========================================================
echo Instalando tudo silenciosamente na sua maquina Windows...
echo ========================================================
call npm install
echo.
echo ========================================================
echo Inicializando o Servidor Local da Caravana...
echo ========================================================
echo.
echo Abra o navegador e digite: http://localhost:3000
echo.
call npm run dev
pause
