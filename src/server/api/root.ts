import { patientRouter } from "~/server/api/routers/patient";
import { createTRPCRouter } from "~/server/api/trpc";
import { appointmentRouter } from "./routers/appointment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  patient: patientRouter,
  appointment: appointmentRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
