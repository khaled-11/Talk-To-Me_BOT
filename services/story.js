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

// Imports dependencies
const Response = require("./response"),
  config = require("./config"),
  i18n = require("../i18n.config");

module.exports = class Story {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handlePayload(payload) {
    let response;
    let type;

    switch (payload) {


      case "STORY":
        response = Response.genQuickReply(i18n.__("story.prompt"), [
          {
            title: i18n.__("story.general"),
            payload: "STORY_GENERAL_GENERAL_STORY"
          },
          {
            title: i18n.__("story.specific"),
            payload: "STORY_SPECIFIC"
          }
        ]);
        break;

      case "STORY_GENERAL_GENERAL_STORY":
	response = this.genStoryResponse(payload);
	break;

      case "STORY_SPECIFIC":
        response = Response.genQuickReply(i18n.__("story.category"), [
          {
            title: i18n.__("story.work"),
            payload: "STORY_WORK"
          },
          {
            title: i18n.__("story.relations"),
            payload: "STORY_RELATIONS"
          },
          {
            title: i18n.__("story.financials"),
            payload: "STORY_FINANCIALS"
          },
          {
            title: i18n.__("story.agent"),
            payload: "CARE_INNER"
          }
        ]);
        break;

      case "STORY_WORK":
        // Store the user mood
        response = Response.genQuickReply(i18n.__("story.mood"), [
          {
            title: "Happy",
            payload: "STORY_MOOD_HAPPY_WORK"
          },
          {
            title: "Neutral",
            payload: "STORY_MOOD_NEUTRAL_WORK"
          },
          {
            title: "Sad",
            payload: "STORY_MOOD_SAD_WORK"
          }
        ]);
        break;

      case "STORY_RELATIONS":
        // Store the user mood
        response = Response.genQuickReply(i18n.__("story.mood"), [
          {
            title: "Happy",
            payload: "STORY_MOOD_HAPPY_RELATIONS"
          },
          {
            title: "Neutral",
            payload: "STORY_MOOD_NEUTRAL_RELATIONS"
          },
          {
            title: "Sad",
            payload: "STORY_MOOD_SAD_RELATIONS"
          }
        ]);
        break;

      case "STORY_FINANCIALS":
        // Store the user mood
        response = Response.genQuickReply(i18n.__("story.mood"), [
          {
            title: "Happy",
            payload: "STORY_MOOD_HAPPY_FINANCIALS"
          },
          {
            title: "Neutral",
            payload: "STORY_MOOD_NEUTRAL_FINANCIALS"
          },
          {
            title: "Sad",
            payload: "STORY_MOOD_SAD_FINANCIALS"
          }
        ]);
        break;

      case "STORY_MOOD_HAPPY_WORK":
      case "STORY_MOOD_NEUTRAL_WORK":
      case "STORY_MOOD_SAD_WORK":
      case "STORY_MOOD_HAPPY_RELATIONS":
      case "STORY_MOOD_NEUTRAL_RELATIONS":
      case "STORY_MOOD_SAD_RELATIONS":
      case "STORY_MOOD_HAPPY_FINANCIALS":
      case "STORY_MOOD_NEUTRAL_FINANCIALS":
      case "STORY_MOOD_SAD_FINANCIALS":
        response = this.genStoryResponse(payload);
        break;

///////////////////////////////////////////////////////////////////////////////////
// Temporary untill add content and then build somelogic based on gender and age //
///////////////////////////////////////////////////////////////////////////////////

      case "STORY_OTHER":
        response = Response.genGenericTemplate(
          `${config.appUrl}/storyO.jpg`,
          i18n.__("storyO.title"),
          i18n.__("storyO.subtitle"),
          [
            Response.genWebUrlButton(
              i18n.__("story.read"),
              `${config.shopUrl}/storyO`
            ),
            Response.genPostbackButton(
              i18n.__("story.other"),
              "STORY_GENERAL_GENERAL_STORY"
            )
          ]
        );
        break;
    }
    return response;
  }

  genStoryResponse(payload) {
     let category = payload.split("_")[3].toLowerCase();
     let mood = payload.split("_")[2].toLowerCase();
 //    let data = `${this.user.gender}-${category}`;
 //    let type = payload.split("_")[1].toLowerCase();
   

    let buttons = [
      Response.genWebUrlButton(
        i18n.__("story.read"),
        `${config.shopUrl}/${category}`
      ),
      Response.genPostbackButton(
        i18n.__("story.more"),
        "STORY_OTHER"
      )
    ];

   if (mood.includes("sad")) {
      buttons.push(
        Response.genPostbackButton(i18n.__("story.inner"), "CARE_INNER")
       );
     }
      let response = Response.genGenericTemplate(
      `${config.appUrl}/${category}.jpg`,
      i18n.__("story.title"),
      i18n.__("story.subtitle"),
      buttons );
      




    return response;
  }

};
