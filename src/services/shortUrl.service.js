import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shortUrl.model.js";

export const createShortUrlWithUser = async (url, userId, slug = null) => {
  try {
    const shortUrl = slug || generateNanoId(7);
    const exists = await urlSchema.findOne({ short_url: slug });

    if (exists) throw new Error("This custom url already exists");

    const newUrl = new urlSchema({
      full_url: url,
      short_url: shortUrl,
      user: userId,
    });

    if (userId) {
      newUrl.user = userId;
    }

    await newUrl.save();
    return shortUrl;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createShortUrlWithoutUser = async (url) => {
  try {
    const shortUrl = generateNanoId(7);

    if (!shortUrl) throw new Error("Short url not generated");

    const newUrl = new urlSchema({
      full_url: url,
      short_url: shortUrl,
    });

    await newUrl.save();
    return shortUrl;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const findShortUrl = async (id) => {
  try {
    const url = await urlSchema.findOneAndUpdate(
      { short_url: id },
      { $inc: { clicks: 1 } }
    );

    if (!url) throw new Error("Short url not found");
    return url;
  } catch (err) {
    console.log(err);
  }
};
