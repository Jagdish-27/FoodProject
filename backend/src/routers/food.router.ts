import { Router } from "express";
import { sample_foods } from "../data";
import expressAsyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

const router = Router();

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const foodsCount = await FoodModel.countDocuments();
    if (foodsCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await FoodModel.create(sample_foods);
    res.send("Seed is done");
  })
);

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
  })
);

router.get(
  "/search/:searchTerm",
  expressAsyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    // const searchTerm = req.params.searchTerm;
    // const foods = sample_foods.filter(food=> food.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
    res.send(foods);
  })
);

router.get(
  "/tags",
  expressAsyncHandler(
    async (req, res) => {
      const tags = await FoodModel.aggregate([
        {
          $unwind: "$tags",
        },
        {
          $group: {
            _id: "$tags",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            count: "$count",
          },
        },
      ]).sort({ count: -1 });

      const all = {
        name: "All",
        count: await FoodModel.countDocuments(),
      };

      tags.unshift(all);

      res.send(tags);
      // res.send(sample_tags);
    }
    // 2 foods 3 tags, unwind tags => foods tag 1
  )
);

router.get(
  "/tag/:tagName",
  expressAsyncHandler(async (req, res) => {
    const foods = await FoodModel.find({ tags: req.params.tagName });
    // const tagName = req.params.tagName;
    // const foods = sample_foods.filter(food=> food.tags.includes(tagName))
    res.send(foods);
  })
);

router.get(
  "/:foodId",
  expressAsyncHandler(async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    // const foodId = req.params.foodId;
    // const food = sample_foods.find(food => food.id === foodId);
    res.send(food);
  })
);

export default router;
