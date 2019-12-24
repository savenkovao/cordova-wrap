/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
    this.addListeners();
  },
  inited: false,

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
//    this.receivedEvent("deviceready");
//    this.addListeners();
  },
  addListeners: function(){
    var that = this;

    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);

    function onOffline() {
        if(that.inited) return;
        that.toggleBlocks(true);
    }

    function onOnline() {
        if(that.inited) return;
        that.receivedEvent("deviceready");
    }

    function toggleBlocks(networkShow, loaderShow) {
        var loader = document.getElementById('loader');
        var network = document.getElementById('no-network');
        loader.style.display = loaderShow ? 'block' : 'none';
        network.style.display = networkShow ? 'block' : 'none';
    }
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    this.inited = true;

    var ref = cordova.InAppBrowser.open(
      "http://80.ease.hysdev.com?in-app-load=true",
       "_blank",
      "location=no,hideurlbar=yes,toolbar=no,clearcache=no,clearsessioncache=no,cleardata=no",
    );

    this.toggleBlocks();

    ref.addEventListener('exit', onExit, false);

    var that = this;

    function onExit() {
        setTimeout(()=>{
            that.receivedEvent("deviceready");
            ref.removeEventListener('exit', onExit, false);
        },100);
    }
  },
  toggleBlocks: function(networkShow, loaderShow) {
      var loader = document.getElementById('loader');
      var network = document.getElementById('no-network');
      loader.style.display = loaderShow ? 'block' : 'none';
      network.style.display = networkShow ? 'block' : 'none';
  }
};

app.initialize();
