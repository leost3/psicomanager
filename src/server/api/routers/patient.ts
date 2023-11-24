import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const patientRouter = createTRPCRouter({
  fetchAll: publicProcedure
    .query(async ({ ctx }) => {
      return {
        patients: await ctx.db.patient.findMany()
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.patient.create({
        data: {
          civilStatus: "divorced",
          dateOfBirth: new Date(),
          email: "leost3@gmail.com",
          firstSession: new Date(),
          name: "leo",
          profession: "Software engineer",
          sessionDuration: 60,
          sessionFrequency: "Weekly",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.patient.findFirst({
      orderBy: { createdAt: "desc" },
      where: { id: ctx.session.user.id },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
