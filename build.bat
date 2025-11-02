@echo off
REM ==============================
REM DEPLOY AUTOMATICO FRONTEND
REM ==============================

REM Ir al directorio del script (raíz del proyecto)
cd /d "%~dp0"

REM Eliminar directorio "assets" del proyecto si existe
if exist assets (
    echo Eliminando directorio "assets" antiguo...
    rmdir /s /q assets
)

REM Construir el proyecto React
echo Ejecutando build de React...
cd src\client
call npm run build
if %errorlevel% neq 0 (
    echo Error al compilar el frontend.
    pause
    exit /b %errorlevel%
)

REM Copiar contenido del directorio dist a la raíz del proyecto
echo Moviendo archivos de build a la raiz...
REM xcopy /e /i /y dist "%~dp0"
move /y dist\* "%~dp0" >nul
for /d %%D in (dist\*) do move /y "%%D" "%~dp0" >nul
if %errorlevel% neq 0 (
    echo Error al compilar el frontend.
    pause
    exit /b %errorlevel%
)

cls
echo Proyecto de React construido y movido a la raiz del proyecto

REM Volver a la raíz del proyecto
cd /d "%~dp0"

REM Pedir mensaje de commit al usuario
set /p commitmsg=Escribe el mensaje del commit a GitHub: 

REM Actualizar GitHub
echo Subiendo cambios a GitHub...
git add .
git commit -m "%commitmsg%"
git push

echo.
echo ==== DEPLOY FINALIZADO ====
pause