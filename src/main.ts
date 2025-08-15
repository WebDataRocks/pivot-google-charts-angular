import { bootstrapApplication } from "@angular/platform-browser";
import { App } from "./app/app.component";
import {
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";

bootstrapApplication(App, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
}).catch((err) => console.error(err));
