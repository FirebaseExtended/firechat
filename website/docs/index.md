---
layout: docs
---

<a name="overview"> </a>
### Overview

Firechat is a simple, extensible chat widget powered by [Firebase](https://firebase.google.com).

It is intended to serve as a concise, documented foundation for chat products built on Firebase. It works out of the box, and is easily extended.


<a name="getting_started"> </a>
### Getting Started

Firechat works out of the box, provided that you include the correct dependencies in your
application, and configure it to use your Firebase account.


#### Downloading Firechat

In order to use Firechat in your project, you need to include the following files in your HTML:

{% highlight html %}
<!-- jQuery -->
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js'></script>

<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/3.0.0/firebase.js"></script>

<!-- Firechat -->
<link rel='stylesheet' href='https://cdn.firebase.com/libs/firechat/2.0.2/firechat.min.css' />
<script src='https://cdn.firebase.com/libs/firechat/2.0.2/firechat.min.js'></script>
{% endhighlight %}

Use the URLs above to download both the minified and non-minified versions of the Firechat JavaScript
and CSS files from the Firebase CDN. You can also download them from the
[releases page of the Firechat GitHub repository](https://github.com/firebase/firechat/releases).
[Firebase Database](https://firebase.google.com/docs/database/web/start) and
[jQuery](https://code.jquery.com/) can be downloaded directly from their respective websites.

You can also install Firechat via npm or Bower and its dependencies will be downloaded
automatically:

```bash
$ npm install firechat --save
```

```bash
$ bower install firechat --save
```

#### Getting Started with the Firebase Realtime Database

Firechat requires Firebase in order to sync and store data. You can
[sign up here for a free account](https://firebase.google.com).


#### Short Example

***Firechat requires an authenticated Firebase reference***. Firebase supports authentication with either your own custom authentication system or a number of built-in providers (more on this below).

Let's put it all together, using Twitter authentication in our example:

{% highlight html %}
<!doctype html>
<html>
  <head>
    <meta charset='utf-8' />

    <!-- jQuery -->
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js'></script>

    <!-- Firebase -->
    <script src="https://www.gstatic.com/firebasejs/3.0.0/firebase.js"></script>

    <!-- Firechat -->
    <link rel='stylesheet' href='https://cdn.firebase.com/libs/firechat/2.0.1/firechat.min.css' />
    <script src='https://cdn.firebase.com/libs/firechat/2.0.2/firechat.min.js'></script>
  </head>
  <body>
    <script type='text/javascript'>
      // Create a new Firebase Database reference, and a new instance of the Login client
      var chatRef = firebase().database().ref().child("chat");
      chatRef.onAuth(function(authData) {
        // Once authenticated, instantiate Firechat with our user id and user name
        if (authData) {
          var chat = new FirechatUI(chatRef, document.getElementById('firechat-wrapper'));
          chat.setUser(authData.uid, authData[authData.provider].displayName);
        }
      });
      function login(provider) {
        chatRef.authWithOAuthPopup(provider, function(error, authData) {
          if (error) {
            console.log(error);
          }
        });
      }
    </script>
    <div id='firechat-wrapper'>
      <a href='#' onclick='login("twitter");'>Login</a>
    </div>
  </body>
</html>
{% endhighlight %}


<a name="authentication"> </a>
### Authentication

Firechat uses Firebase [Authentication](https://firebase.google.com/docs/auth/) and [Security Rules](https://firebase.google.com/docs/database/security/), giving you the flexibility to authenticate with either your own custom authentication system or a number of built-in providers.

#### Integrate Your Own Authentication

If you already have authentication built into your application, you can integrate it with Firebase by generating your own JSON Web Tokens (JWT).

Firebase provide helper libraries to generate these tokens for various languages, including: [.NET](https://github.com/firebase/firebase-token-generator-dotNet), [Java](https://github.com/firebase/firebase-token-generator-java), [Node.js](https://github.com/firebase/firebase-token-generator-node), [PHP](https://github.com/firebase/firebase-token-generator-php), [Python](https://github.com/firebase/firebase-token-generator-python), [Ruby](https://github.com/firebase/firebase-token-generator-ruby).

Each token should be generated with a `uid`:

  * The `uid` is the unique identifier for the user (*string*).

After generating the JWT, authenticate your Firebase reference:

{% highlight javascript %}
var firechatAuth = firebase().auth().ref();
firechatAuth.signInWithCustomToken(<token>); // TODO: CHECK ON THIS
{% endhighlight %}

For more information, check out the documentation for [Firebase Custom Login](https://firebase.google.com/docs/auth/web/custom-auth).

#### Delegate Authentication to Firebase

Firebase has a built-in service that allows you to authenticate with [Facebook](https://firebase.google.com/docs/auth/web/facebook-login), [Twitter](https://firebase.google.com/docs/auth/web/twitter-login), [GitHub](https://firebase.google.com/docs/auth/web/github-auth), [Google](https://firebase.google.com/docs/auth/web/google-signin), or [email / password](https://firebase.google.com/docs/auth/web/password-auth) using only client-side code.

* To begin, enable your provider of choice in your Firebase account. Social login services may require you to create and configure an application and an authorized origin for the request.

* Then authenticate the user on the client using your provider of choice:

{% highlight javascript %}
var firechatAuth = firebase().auth();
firechatAuth.onAuthStateChanged(function(authData) { ... });
...
firechatAuth.signInWithPopup('twitter' /* or 'facebook', 'github, 'persona', 'password' */, function(error, authData) {
  if (error) {
    console.log(error);
  }
});
{% endhighlight %}

For more information, check out the documentation for [User Authentication](https://firebase.google.com/docs/auth/web/manage-users).


<a name="customizing"> </a>
### Customizing Firechat

Dive into the Firechat code to tweak the default interface or add a new one, change behavior or add new functionality.

#### Code Structure

* **`firechat.js`** is a conduit for data actions and bindings, allowing you to do things like enter or exit chat rooms, send and receive messages, create rooms and invite users to chat rooms, etc. Its sole dependency is Firebase.

* **`firechat-ui.js`** is a full-fledged chat interface that demonstrates hooking into `firechat.js` and exposes a rich set of functionality to end users out-of-the-box.

* **`rules.json`** defines a rule structure that maps to the data structure defined in `firechat.js`, defining both the data structure requirements and which users may read or write to which locations in Firebase. When uploaded to your Firebase, this configuration offers robust security to ensure that only properly authenticated users may chat, and neither user data nor private chat messages can be compromised.

#### Modifying the Default UI

The default Firechat UI is built using jQuery and Underscore.js, as well as Bootstrap for some styles and UI elements. To get started making changes, see `firechat-default.js` and `styles.less` to begin modifying the look and feel of the UI.

When you're ready to build, simply execute `grunt` from the root directory of the project to compile your code into the combined output.

#### Building a New UI

To get started with a new UI layer, create a directory for your new interface under the `layouts` directory, using the name of your new interface.

Next, create a primary JavaScript interface for your UI using the name `firechat-ui.js`, and add styles, layouts, and templates following the same convention as the default layout.

Lastly, begin hooking into the Firechat API, detailed below, using the exposed methods and defined bindings.

<div class="emphasis-box">Missing something? Send us a <a href="https://github.com/firebase/firechat/pulls" target="_blank">pull request</a> and contribute to the repository!</div>


<a name="api"> </a>
### Firechat API

Firechat exposes a number of useful methods and bindings to initiate chat, enter and exit chat rooms, send invitations, create chat rooms, and send messages.

#### Instantiating Firechat
{% highlight javascript %}
var chat = new Firechat(firebaseRef);
chat.setUser(userId, userName, function(user) {
  chat.resumeSession();
});
{% endhighlight %}


<a name="api_methods"> </a>
#### API - Public Methods

`Firechat.setUser(userId, userName, onComplete)`

> Initiates the authenticated connection to Firebase, loads any user metadata,
> and initializes Firebase listeners for chat events.

`Firechat.resumeSession()`

> Automatically re-enters any chat rooms that the user was previously in, if the
> user has history saved.

`Firechat.on(eventType, callback)`

> Sets up a binding for the specified event type (*string*), for which the
> callback will be invoked. See [API - Exposed Bindings](#api_bindings)
> for more information.

`Firechat.createRoom(roomName, roomType, callback(roomId))`

> Creates a new room with the given name (*string*) and type (*string* - `public` or `private`) and invokes the callback with the room ID on completion.

`Firechat.enterRoom(roomId)`

> Enters the chat room with the specified id. On success, all methods bound to the `room-enter` event will be invoked.

`Firechat.leaveRoom(roomId)`

> Leaves the chat room with the specified id. On success, all methods bound to the `room-exit` event will be invoked.

`Firechat.sendMessage(roomId, messageContent, messageType='default', callback)`

> Sends the message content to the room with the specified id and invokes the callback on completion.

`Firechat.toggleUserMute(userId, callback)`

> Mute or unmute a given user by id.

`Firechat.inviteUser(userId, roomId)`

> Invite a the specified user to the specific chat room.

`Firechat.acceptInvite(inviteId, callback)`

> Accept the specified invite, join the relevant chat room, and notify the user who sent it.

`Firechat.declineInvite(inviteId, callback)`

> Decline the specified invite and notify the user who sent it.

`Firechat.getRoomList(callback)`

> Fetch the list of all chat rooms.

`Firechat.getUsersByRoom(roomId, [limit=100], callback)`

> Fetch the list of users in the specified chat room, with an optional limit.

`Firechat.getUsersByPrefix(prefix, startAt, endAt, limit, callback)`

> Fetch the list of all active users, starting with the specified prefix, optionally between the specified startAt and endAt values, up to the optional, specified limit.

`Firechat.getRoom(roomId, callback)`

> Fetch the metadata for the specified chat room.


<a name="api_bindings"> </a>
#### API - Exposed Bindings

To bind events to Firechat, invoke the public `on` method using an event ID and callback function. Public bindings are detailed below:

> Supported event types include:

> * `user-update` - Invoked when the user's metadata changes.
> * `room-enter` - Invoked when the user successfully enters a room.
> * `room-exit` - Invoked when the user exists a room.
> * `message-add` - Invoked when a new message is received.
> * `message-remove` - Invoked when a message is deleted.
> * `room-invite` - Invoked when a new room invite is received.
> * `room-invite-response` - Invoked when a response to a previous invite is received.


<a name="data_structure"> </a>
### Data Structure

Firechat uses [Firebase](https://firebase.google.com) for its data storage and synchronization. This means (a) you don't need to run any server code and (b) you get access to all the the Firebase features, including first-class data security, automatic scaling, and data portability.

You own all of the data and can interact with it in a variety of ways. Firechat stores your data at the Firebase location you specify using the
following data structure:

* `moderators/`
    * `<user-id>` - A list of user ids and their moderator status.
        * `true|false` - A boolean value indicating the user's moderator status.
* `room-messages/`
    * `<room-id`>
        * `<message-id`>
            * `userId` - The id of the user that sent the message.
            * `name` - The name of the user that sent the message.
            * `message` - The content of the message.
            * `timestamp` - The time at which the message was sent.
* `room-metadata/`
    * `<room-id>`
        * `createdAt` - The time at which the room was created.
        * `createdByUserId`- The id of the user that created the room.
        * `id` - The id of the room.
        * `name` - The public display name of the room.
        * `type` - The type of room, `public` or `private`.
* `room-users/`
* `user-names-online/`
* `users/`
    * `<user-id`>
        * `id` - The id of the user.
        * `name` - The display name of the user.
        * `invites` - A list of invites the user has received.
        * `muted` - A list of user ids currently muted by the user.
        * `rooms` - A list of currently active rooms, used for sessioning.

You may find it useful to interact directly with the Firebase data when building related features on your site. See the code or view the data in Forge (just enter your Firebase URL in a browser) for more details.

### Security
To lock down your Firechat data, you can use Firebase's builtin
[Security features](https://firebase.google.com/docs/database/security/).  For some example
security rules for Firechat, see these [example rules on Github](https://github.com/firebase/firechat/tree/master/rules.json).
