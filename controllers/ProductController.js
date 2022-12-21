import ProductModel from '../models/Product.js';

export const getLastTags = async (req, res) => {
  try {
    const products = await ProductModel.find().limit(5).exec();

    const tags = products
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await ProductModel.find().populate('product').exec();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'failed',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const productId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'failed',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'No product found',
          });
        }

        res.json(doc);
      },
    ).populate('user');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'No product picked up',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const productId = req.params.id;

    ProductModel.findOneAndDelete(
      {
        _id:productId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Field to delete item',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Product not found',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to add product',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new ProductModel({
      title: req.body.title,
      desc: req.body.desc,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      count: req.body.count,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Could not create product',
    });
  }
};

export const update = async (req, res) => {
  try {
    const productId = req.params.id;

    await productModel.updateOne(
      {
        _id: productId,
      },
      {
        title: req.body.title,
        desc: req.body.desc,
        imageUrl: req.body.imageUrl,
        price: req.priceId,
        count: req.body.count
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Could not update product',
    });
  }
};