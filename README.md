# Svelte Server Requirements

Hopefully, all dependencies for node should be installed within the node_modules folder.

However, if you do not have NodeJS installed, this is required for the running of the application.

https://nodejs.org/en

Once this is installed, running ```npm -i``` will install all dependencies within the package.json file. Is this needed? Does the package file contain all the dependencies? I don't know-

Anyway, I'll check everything out before final submission. It is probably a lot of pain to setup now.

To run the database server, you need to open XAMPP. This can be found in the XAMPP director -> "xampp-control.exe". Once XAMPP is open, run "MySQL"

For actually starting the server, run:

```node server.cjs```

in the root directory. This runs the JavaScript code in node runtime environment, which is the backend (and serves the HTML stuff). However, built into the server.cjs command is

```npm run build```

which compiles all the svelte files into native script. As I said, it should be in-built, but just FYI. 

After that, you can navigate to http://localhost:21511

You can just follow the terminal prompts though.