#Names a server and declares the listening port
server {
  listen 80;
  server_name www.starwarsdiceroller.com starwarsdiceroller.com;

  #Configures the publicly served root directory
  #Configures the index file to be served
  root /var/www/starwarsdiceroller.com;
      index index.html index.htm;

  location /resume {
  default_type "text/html";
  try_files  /$uri /$uri.html;
  }


  #These lines create a bypass for certain pathnames
  #www.example.com/test.js is now routed to port 3000 
  #instead of port 80
  location /test.js {
      proxy_pass http://localhost:3000;
      proxy_set_header Host $host;
  }
}
