readme file

OVERVIEW

This application is an implementation
of a short tutorial on 
user authentication for
logging into an applicatin

**General File Structure**

--//loginApp01
      |
      |___bin
      |
      |___config
      |
      |___node_modules
      |
      |___public
      |
      |___routes
      |
      |___views
      |
      ___app.js
      
      ___package-lock.json

      ___package.json
      
      ___readme.txt
 


This tutorial is a continuation of
the previous loginApp, here the whole 
login was restructured into a basic web
applicaton template folder using express. 
Additional routes were created for authentication 

----//routes
      |
      |___auth.js
      |
      |___home.js
      |


and
other configuration such as the db and session
where done as seperate module files in config folder

----//config
      |
      |___dbConfig.js
      |
      |___session.js







