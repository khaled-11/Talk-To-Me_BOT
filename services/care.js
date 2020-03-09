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
  Survey = require("./survey"),
  config = require("./config"),
  i18n = require("../i18n.config");

module.exports = class Care {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handlePayload(payload) {
    let response;

    switch (payload) {
      case "CARE_HELP":
        response = Response.genQuickReply(
          i18n.__("care.prompt", {
            userFirstName: this.user.firstName
          }),
          [
            {
              title: i18n.__("care.advice"),
              payload: "CARE_ADVICE"
            },
            {
              title: i18n.__("care.donations"),
              payload: "CARE_DONATIONS"
            },
            {
              title: i18n.__("care.others"),
              payload: "CARE_OTHERS"
            }
          ]
        );
        break;


      case "CARE_ADVICE":
        // Send using the Persona for advices

        response = [
          Response.genTextWithPersona(
            i18n.__("care.adviceR", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaAdvice.name,
              topic: i18n.__("care.advice")
            }),
            config.personaAdvice.id
          ),
          Response.genTextWithPersona(
            i18n.__("care.end"),
            config.personaAdvice.id
          ),
          Survey.genAgentRating(config.personaAdvice.name)
        ];
        break;

      case "CARE_DONATIONS":
        // Send using the Persona for donations issues

        response = [
          Response.genTextWithPersona(
            i18n.__("care.donationsR", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaDonations.name,
              topic: i18n.__("care.donations")
            }),
            config.personaDonations.id
          ),
          Response.genTextWithPersona(
            i18n.__("care.end"),
            config.personaDonations.id
          ),
          Survey.genAgentRating(config.personaDonations.name)
        ];
        break;

      case "CARE_INNER":
        // Send using the Persona for inner questions

        response = [
          Response.genTextWithPersona(
            i18n.__("care.innerR", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaInner.name
            }),
            config.personaInner.id
          ),
          Response.genTextWithPersona(
            i18n.__("care.end"),
            config.personaInner.id
          ),
          Survey.genAgentRating(config.personaInner.name)
        ];
        break;

      case "CARE_OTHERS":
        // Send using the Persona for customer care issues

        response = [
          Response.genTextWithPersona(
            i18n.__("care.default", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaOthers.name
            }),
            config.personaOthers.id
          ),
          Response.genTextWithPersona(
            i18n.__("care.end"),
            config.personaOthers.id
          ),
          Survey.genAgentRating(config.personaOthers.name)
        ];
        break;
    }

    return response;
  }
};
