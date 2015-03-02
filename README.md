CSGOManager is a full-stack JavaScript open-source solution, which provides several tools to manage CSGO servers.

## Prerequisites
Make sure you have installed all these prerequisites on your machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ npm install -g bower
```

## Description
To start, you have to add one or more servers. Once it's done, servers can be update automatically by sending a request to the server to ask general information.
After you can remote manage your server by sending RCON commands, configure a match or show multiple statistics about matches, teams, players.

## Functionalities

### Servers Management
With this tool, you can add several servers. When you add a server you have to inform some information like IP, Port, Name. You can also activate three kind of live update.
The first is to choose interval to refresh general information about the servers. The second is to choose the interval to refresh details server. And the last is to choose the interval to update server players.

### RCON command
This tools is a console to send one or more RCON command. To start you have to choose the server for what you which to send a command and push on 'connexion'.
After you must to inform the RCON password and one or more command separate by ';'. When you push on 'send' button, the first time an authenticate request is send with the RCON password.
Bottom the console, there is a log view that display in live a lot of informations like if the authentication is successful or if the command is successfully send.

### Match handler

### Statistics
