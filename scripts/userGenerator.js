'use strict';
// Script for populating fake chat data
var secret = "CHANGE_ME";
var url = "CHANGE_ME";

var Firebase = require('firebase');
var ref = new Firebase(url);
var async = require('async');
ref.authWithCustomToken(secret, function(error, authData) {
    let communityRef = ref.child('chat').child('community-2');
    let usersRef = communityRef.child('users');
    let onlineRef = communityRef.child('user-names-online');
    let uids = [];
    for (var x = 100; x < 500; x+=1) {
        uids.push(x);
    }
    async.eachSeries(uids, function(uid, done){
        let name = 'Generated User ' + uid;
        console.log('Creating ' + name);
        let sessionRef = onlineRef.child(name.toLowerCase()).push();
        sessionRef.child('id').set("" + uid);
        sessionRef.child('name').set(name);
        let userRef = usersRef.child(uid);
        userRef.child('id').set("" + uid);
        userRef.child('name').set(name);
        userRef.child('sessions').child(sessionRef.key()).set(true, function(){
            setTimeout(function(){
                done();
            }, 300)
        });
    }, function(){
        console.log("Done!");
    });
});
