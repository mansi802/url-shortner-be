import shortUrl from "../models/shortUrl.model.js";
import {
  createShortUrlWithUser,
  findShortUrl,
  createShortUrlWithoutUser,
} from "../services/shortUrl.service.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const data = req.body;

    let shortUrl;
    if (req.user) {
      shortUrl = await createShortUrlWithUser(
        data.url,
        req.user._id,
        data.slug
      );
    } else {
      shortUrl = await createShortUrlWithoutUser(data.url);
    }

    res.status(200).json({
      shortUrl: process.env.FRONTEND_URL + "/" + shortUrl,
    });
  } catch (err) {
    next(err);
  }
};

export const redirectFromShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const url = await findShortUrl(id);

    if (url) {
      res.redirect(url.full_url);
    } else {
      res.status(404).json({
        error: "Short URL not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUrls = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const urls = await shortUrl.find({ user: _id });
    res.status(200).json({
      urls,
    });
  } catch (err) {
    next(err);
  }
};
