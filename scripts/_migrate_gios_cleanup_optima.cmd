@echo off
REM Time-gated Optima cleanup on GIOS (called by Task Scheduler).
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0_migrate_gios_cleanup_optima.ps1"
exit /b %ERRORLEVEL%
