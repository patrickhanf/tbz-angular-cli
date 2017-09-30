//
// https://blog.thecodecampus.de/angular-2-include-google-analytics-event-tracking/
// https://www.npmjs.com/package/@types/angular-google-analytics
//

import {Injectable} from "@angular/core";

@Injectable()
export class GoogleAnalyticsEventsService {

  public emitEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: number = null) {
    ga('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }
}