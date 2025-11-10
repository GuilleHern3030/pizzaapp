cd src/client
call npm run build
start "" "http://localhost:5172"  
call npm run preview -- --host --port 5172 


