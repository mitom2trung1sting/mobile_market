import express from "express";
import moment from "moment";
import { Session } from "../type/type";

import { Resend } from "resend";
import { ReceiptEmailHtml } from "../components/emails/ReceiptEmail";
import { Product, User } from "../payload-types";
import { getPayloadClient } from "../get-payload";

export const CreatePaymentUrl = async (
  req: express.Request,
  res: express.Response,
  session: Session,
  productIds: string[],
  products: Product[],
  user: User
) => {
  const payload = await getPayloadClient();

  const listProduct = CountElements(productIds);

  let productAmount = 0;

  for (let tmp of listProduct) {
    const currentProduct = products.find((obj) => tmp.id === obj.id);

    if (currentProduct) {
      const { price, totalAvailable, discount } = currentProduct;
      const currentPrice = price - (price * discount) / 100;
      productAmount += currentPrice * tmp.quantity;

      await payload.update({
        collection: "products",
        data: {
          totalAvailable: totalAvailable - tmp.quantity,
        },
        where: {
          id: {
            equals: tmp.id,
          },
        },
      });
    } else {
      return payload.logger.error("Product not found");
    }
  }

  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");
  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress;

  let vnp_TmnCode = "W15T4SYM";
  let vnp_HashSecret = "NVONKSHZ5YZ1MMU5KUI118EXOLUXB0QM";
  let vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  let vnp_Api = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";
  let vnp_ReturnUrl = session.success_url;

  var vnpUrl = vnp_Url;
  var orderId = session.metadata.orderId;
  var amount = productAmount;
  var bankCode = req.body.bankCode;

  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType;
  var locale = req.body.language ?? "vn";
  var currCode = "VND";
  var vnp_Params: Record<string, any> = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = vnp_TmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = vnp_ReturnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (!!bankCode) {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params); // Uncomment this line if the sortObject function is defined

  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", vnp_HashSecret);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  if (!!vnpUrl) {
    await payload.update({
      collection: "orders",
      data: {
        _isPaid: true,
        user: session.metadata.userId,
      },
      where: {
        id: {
          equals: session.metadata.orderId,
        },
      },
    });

    ResendEmailWebHook(session, user, products, productAmount, listProduct);
  }

  return vnpUrl;
};

function sortObject(obj: any) {
  let sorted: Record<string, any> = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const ResendEmailWebHook = async (
  session: Session,
  user: User,
  products: Product[],
  productAmount: number,
  listProduct: CountElement[]
) => {
  // send receipt
  try {
    await resend.emails.send({
      from: "Tuấn Minh iStore <onboarding@resend.dev>",
      to: [user.email],
      subject:
        "Cảm ơn đã mua hàng tại Tuấn Minh iStore! 🎉. Dưới đây là hóa đơn của bạn.",
      html: ReceiptEmailHtml({
        date: new Date(),
        email: user.email,
        orderId: session.metadata.orderId,
        products: products as Product[],
        productAmount,
        listProduct,
      }),
    });
  } catch (error) {
    console.log("====================================");
    console.log("loi o day line 110 ", error);
    console.log("====================================");
  }
};

export type CountElement = {
  id: string;
  quantity: number;
};

export function CountElements(arr: string[]): CountElement[] {
  const counts: Record<string, number> = {};
  for (let i = 0; i < arr.length; i++) {
    if (counts[arr[i]]) {
      counts[arr[i]]++;
    } else {
      counts[arr[i]] = 1;
    }
  }

  return Object.entries(counts).map(([id, quantity]) => ({
    id: id,
    quantity: Number(quantity),
  }));
}
