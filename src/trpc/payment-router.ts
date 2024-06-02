import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getPayloadClient } from "../get-payload";
import { privateProcedure, router } from "./trpc";
import { CreatePaymentUrl, ResendEmailWebHook } from "./webhooks";

export const paymentRouter = router({
  createSession: privateProcedure
    .input(z.object({ productIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      let { productIds } = input;
      if (productIds.length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const payload = await getPayloadClient();

      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productIds,
          },
        },
      });

      const order = await payload.create({
        collection: "orders",
        data: {
          _isPaid: false,
          products: products.map((product) => product.id),
          user: user.id,
        },
      });

      const session = {
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
        metadata: {
          userId: user.id,
          orderId: order.id,
          productIds,
        },
      };

      try {
        const { docs: users } = await payload.find({
          collection: "users",
          where: {
            id: {
              equals: session.metadata.userId,
            },
          },
        });

        if (!users.length) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        const [user] = users;

        const { docs: products } = await payload.find({
          collection: "products",
          where: {
            id: {
              in: session.metadata.productIds,
            },
          },
        });

        const url = await CreatePaymentUrl(ctx.req, ctx.res, session, products);

        if (!!url) {
          for (const product of products) {
            const totalAvailable = product.totalAvailable - 1;
            await payload.update({
              collection: "products",
              data: {
                totalAvailable,
              },
              where: {
                id: {
                  equals: product.id,
                },
              },
            });
          }

          await payload.update({
            collection: "orders",
            data: {
              _isPaid: true,
            },
            where: {
              id: {
                equals: session.metadata.orderId,
              },
            },
          });
          ResendEmailWebHook(ctx.req, ctx.res, session, user, products);
        }

        return { url };
      } catch (err) {
        return { url: session.cancel_url };
      }
    }),
  pollOrderStatus: privateProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const { orderId } = input;

      const payload = await getPayloadClient();

      const { docs: orders } = await payload.find({
        collection: "orders",
        where: {
          id: {
            equals: orderId,
          },
        },
      });

      if (!orders.length) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [order] = orders;

      return { isPaid: order._isPaid };
    }),
});
