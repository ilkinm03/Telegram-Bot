import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { EnvConfig } from "./env.config";
import { Application } from "express";

export const sentryConfig = (app: Application) => {
  Sentry.init({
    dsn: EnvConfig.sentryDSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
};

export const sentryErrorHandler = (app: Application) => {
  app.use(Sentry.Handlers.errorHandler(
    {
      shouldHandleError(error): boolean {
        return error.status === 404 || parseInt(<string>error.status) >= 500;
      },
    },
  ));
};
