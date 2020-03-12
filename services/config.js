/**
 * Copyright 2019-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

// Use dotenv to read .env vars into Node
require("dotenv").config();

// Required environment variables
const ENV_VARS = [
  "PAGE_ID",
  "APP_ID",
  "PAGE_ACCESS_TOKEN",
  "APP_SECRET",
  "VERIFY_TOKEN",
  "APP_URL",
  "SHOP_URL"
];

module.exports = {
  // Messenger Platform API
  mPlatformDomain: "https://graph.facebook.com",
  mPlatformVersion: "v6.0",

  // Page and Application information
  pageId: process.env.PAGE_ID,
  appId: process.env.APP_ID,
  pageAccesToken: process.env.PAGE_ACCESS_TOKEN,
  appSecret: process.env.APP_SECRET,
  verifyToken: process.env.VERIFY_TOKEN,

  // URL of your app domain
  appUrl: process.env.APP_URL,

  // URL of your website
  shopUrl: process.env.SHOP_URL,

  // Persona IDs
  personas: {},

  // Preferred port (default to 3000)
  port: process.env.PORT || 3000,

  get mPlatfom() {
    return this.mPlatformDomain + "/" + this.mPlatformVersion;
  },

  // URL of your webhook endpoint
  get webhookUrl() {
    return this.appUrl + "/webhook";
  },


  get personaInner() {
    let id = this.personas["Khaled"] || process.env.PERSONA_INNER;
    return {
      name: "Khaled",
      id: id
    };
  },

  get personaDonations() {
    let id = this.personas["Khaled"] || process.env.PERSONA_DONATIONS;
    return {
      name: "Khaled",
      id: id
    };
  },

  get personaAdvice() {
    let id = this.personas["Lenda"] || process.env.PERSONA_ADVICE;
    return {
      name: "Lenda",
      id: id
    };
  },

  get personaOthers() {
    let id = this.personas["Lenda"] || process.env.PERSONA_OTHERS;
    return {
      name: "Lenda",
      id: id
    };
  },

  get whitelistedDomains() {
    return [this.appUrl, this.shopUrl];
  },

  checkEnvVariables: function() {
    ENV_VARS.forEach(function(key) {
      if (!process.env[key]) {
        console.log("WARNING: Missing the environment variable " + key);
      } else {
        // Check that urls use https
        if (["APP_URL", "SHOP_URL"].includes(key)) {
          const url = process.env[key];
          if (!url.startsWith("https://")) {
            console.log(
              "WARNING: Your " + key + ' does not begin with "https://"'
            );
          }
        }
      }
    });
  }
};
