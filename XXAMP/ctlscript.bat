@echo off
rem START or STOP Services
rem ----------------------------------
rem Check if argument is STOP or START

if not ""%1"" == ""START"" goto stop

if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\hypersonic\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\server\hsql-sample-database\scripts\ctl.bat START)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\ingres\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\ingres\scripts\ctl.bat START)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\mysql\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\mysql\scripts\ctl.bat START)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\postgresql\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\postgresql\scripts\ctl.bat START)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\apache\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\apache\scripts\ctl.bat START)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\openoffice\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\openoffice\scripts\ctl.bat START)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\apache-tomcat\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\apache-tomcat\scripts\ctl.bat START)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\resin\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\resin\scripts\ctl.bat START)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\jetty\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\jetty\scripts\ctl.bat START)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\subversion\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\subversion\scripts\ctl.bat START)
rem RUBY_APPLICATION_START
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\lucene\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\lucene\scripts\ctl.bat START)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\third_application\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\third_application\scripts\ctl.bat START)
goto end

:stop
echo "Stopping services ..."
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\third_application\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\third_application\scripts\ctl.bat STOP)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\lucene\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\lucene\scripts\ctl.bat STOP)
rem RUBY_APPLICATION_STOP
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\subversion\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\subversion\scripts\ctl.bat STOP)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\jetty\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\jetty\scripts\ctl.bat STOP)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\hypersonic\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\server\hsql-sample-database\scripts\ctl.bat STOP)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\resin\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\resin\scripts\ctl.bat STOP)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\apache-tomcat\scripts\ctl.bat (start /MIN /B /WAIT C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\apache-tomcat\scripts\ctl.bat STOP)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\openoffice\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\openoffice\scripts\ctl.bat STOP)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\apache\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\apache\scripts\ctl.bat STOP)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\ingres\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\ingres\scripts\ctl.bat STOP)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\mysql\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\mysql\scripts\ctl.bat STOP)
if exist C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\postgresql\scripts\ctl.bat (start /MIN /B C:\Users\joshu\Documents\Waghorn-J-SvelteScorer\XXAMP\postgresql\scripts\ctl.bat STOP)

:end

