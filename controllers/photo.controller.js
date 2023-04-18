const cloudinary = require("../utilities/cloudinary");
const upload = require("../utilities/multer");
const User = require("../models/user");
const Photo = require("../models/photo");
const chalk = require("chalk");
export default {
  async AllPhotos(req, res, next) {
    try {
      const user = await User.findById(req.user._id).populate("photos");
      // console.log(chalk.blueBright("user data @ allPhotos:"), user);
      const foundPhotos = user.photos;
      res.locals.data.photos = foundPhotos;
      // console.log("res.locals.data.photos:", res.locals.data.photos);
      next();
    } catch (error) {
      console.error(chalk.bold.red(error));
      res.status(500).json({ error });
    }
  },
  async onePhoto(req, res, next) {
    const { id } = req.params;
    try {
      const targetPhoto = await Photo.findById(id);
      res.locals.data.photo = targetPhoto;
      next();
    } catch (error) {
      console.error(chalk.bold.red(error));
      res.status(500).json({ error });
    }
  },
  async createPhotos(req, res, next) {
    try {
      console.log(
        chalk.bold.green("Req.body @ createPhotos"),
        chalk.blueBright(req.body)
      );

      const photos = [];
      if (!Array.isArray(req.body)) {
        return res
          .status(400)
          .json({ error: "Invalid request body: images must be an array" });
      }
      for (let i = 0; i < req.body.length; i++) {
        const photo = new Photo({
          title: req.body[i].title,
          date: req.body[i].date,
          image: req.body[i].image,
          public_id: req.body[i].public_id,
          owner: req.user._id,
        });
        await photo.save();
        photos.push(photo._id);
      }

      await User.findOneAndUpdate({ _id: req.user._id }, { $push: { photos } });
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Photo creation failed!" });
    }
  },

  async editPhoto(req, res, next) {
    const { id } = req.params;
    try {
      let photo = await Photo.findById(id);

      await cloudinary.uploader.destroy(photo.public_id);
      const data = {
        title: req.body.name || photo.name,
        date: req.body.date || photo.date,
        image: req.body.image || photo.image,
        public_id: req.body.public_id || photo.public_id,
      };
      photo = await Photo.findByIdAndUpdate(id, data, {
        new: true,
      });
      res.locals.data.photo = photo;
      next();
    } catch (error) {
      console.error(chalk.bold.red(error));
      res.status(500).json({ error });
    }
  },
  async deletePhoto(req, res, next) {
    const { id } = req.params;
    try {
      let photo = await Photo.findById(id);
      await cloudinary.uploader.destroy(photo.public_id);
      await photo.deleteOne({ id: photo._id });
      res.locals.data.photo = photo;
      next();
    } catch (error) {
      console.error(chalk.bold.red(error));
      res.status(500).json({ error });
    }
  },
};

const apiController = {
  index(req, res) {
    res.json(res.locals.data.photos);
  },
  show(req, res) {
    res.json(res.locals.data.photo);
  },
};

module.exports = {
  dataController,
  apiController,
};
