@echo off

if not ""%1"" == ""START"" goto stop

cmd.exe /C start /B /MIN "" "C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\apache\bin\httpd.exe"

if errorlevel 255 goto finish
if errorlevel 1 goto error
goto finish

:stop
cmd.exe /C start "" /MIN call "C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\killprocess.bat" "httpd.exe"

if not exist "C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\apache\logs\httpd.pid" GOTO finish
del "C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\apache\logs\httpd.pid"
goto finish

:error
echo Error starting Apache

:finish
exit
