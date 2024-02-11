const Post = require("../models/post.js");
const User = require("../models/user.js");
const Category = require("../models/category.js");
const fs = require("fs");
const { Sequelize } = require("sequelize");
const {
  getFullImageUrl,
  deleteOldImage,
} = require("../services/imageService.js");

exports.getAllPosts = async (req, res) => {
  try {
    // Získanie parametrov z query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "newest";
    const categories = req.query.categories; // Získanie kategórií (ID) z query stringu
    const offset = (page - 1) * limit;
    const search = req.query.search;

    // Rozlíšenie logiky zoradenia na základe hodnoty sort
    let order;
    switch (sort) {
      case "newest":
        order = [["created_at", "DESC"]];
        break;
      case "oldest":
        order = [["created_at", "ASC"]];
        break;
      case "recentlyUpdated":
        order = [["updated_at", "DESC"]];
        break;
      case "leastRecentlyUpdated":
        order = [["updated_at", "ASC"]];
        break;
      case "mostPopular":
        // Predpokladá, že máte stĺpec alebo spôsob, ako určiť popularitu, napr. počet lajkov alebo zobrazení
        order = [["view_count", "DESC"]]; // Zmeniť 'popularity' na váš relevantný stĺpec
        break;
      case "leastPopular":
        order = [["view_count", "ASC"]]; // Zmeniť 'popularity' na váš relevantný stĺpec
        break;
      default:
        order = [["created_at", "DESC"]];
    }

    // Filtrovanie podľa kategórií, ak sú špecifikované
    let whereCondition = {};
    if (categories) {
      const categoryIds = categories.split(",").map((id) => parseInt(id)); // Konverzia na pole čísel
      whereCondition.category_id =
        categoryIds.length > 1 ? categoryIds : categoryIds[0];
    }

    if (search) {
      whereCondition[Sequelize.Op.or] = [
        {
          title: {
            [Sequelize.Op.like]: `%${search}%`, // Použitie 'like' pre MySQL
          },
        },
        {
          description: {
            [Sequelize.Op.like]: `%${search}%`,
          },
        },
      ];
    }

    const { count, rows } = await Post.findAndCountAll({
      include: [
        {
          model: Category,
          attributes: ["name", "description"],
        },
      ],
      where: whereCondition,
      limit,
      offset,
      order,
    });

    res.json({
      posts: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalPosts: count,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send(error.message);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username", "user_id"], // Vyberieme len meno užívateľa
        },
        {
          model: Category,
          attributes: ["name", "description"], // Vyberieme len názov kategórie
        },
      ],
    });

    if (post) {
      const result = {
        ...post.get({ plain: true }), // Konvertuje Sequelize model na obyčajný objekt
        User: { username: `${post.User.username}#${post.User.user_id}` }, // Pridáme username priamo do objektu
      };
      res.json(result);
      post.view_count += 1;
      post.save();
    } else {
      res.status(404).send("Príspevok nebol nájdený");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createPost = async (req, res) => {
  const { title, content, description, category: category_id } = req.body;
  const author_id = req.auth.payload.user_id;

  if (!title || !content || !author_id || !description) {
    return res
      .status(400)
      .send("Názov, obsah, autor a popisok sú povinné údaje.");
  }

  // Generovanie URL pre obrázok
  const imageUrl = getFullImageUrl(req.file?.path);

  try {
    const newPost = await Post.create({
      title,
      content,
      author_id,
      description,
      category_id,
      image: imageUrl, // Pridanie URL obrázka do databázy
    });
    res.status(201).json(newPost);
  } catch (error) {
    // Odstránenie obrázka z disku, ak nastala chyba pri vytváraní príspevku
    deleteOldImage(req.file?.path);

    console.error("Chyba pri vytváraní príspevku:", error);
    res.status(500).send(error.message);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findOne({ where: { post_id: postId } });

    if (!post) {
      return res.status(404).send("Príspevok nebol nájdený");
    }

    const oldImagePath = post.image;

    await post.destroy();

    deleteOldImage(oldImagePath);

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const {
      title,
      content,
      description,
      category: category_id,
      image,
    } = req.body;
    const removeImage = image === "REMOVE_IMAGE";

    const post = await Post.findOne({ where: { post_id: postId } });

    if (!post) {
      return res.status(404).send("Príspevok nebol nájdený");
    }

    let imageUrl = post.image;
    let oldImagePath = null;

    if (req.file) {
      // Užívateľ nahral nový obrázok
      imageUrl = getFullImageUrl(req.file.path);
      oldImagePath = post.image; // Uloženie cesty k starému obrázku pre možné neskoršie odstránenie
    } else if (removeImage) {
      oldImagePath = post.image; // Uloženie cesty k starému obrázku pre možné neskoršie odstránenie
      imageUrl = null;
    }

    // Aktualizácia záznamu v databáze
    await post.update({
      title,
      content,
      description,
      category_id,
      image: imageUrl,
    });

    // Odstránenie starého obrázka z disku, ak je potrebné
    if (oldImagePath) {
      deleteOldImage(oldImagePath);
    }

    res.status(204).send();
  } catch (error) {
    console.error("Chyba pri aktualizácii príspevku:", error);
    res.status(500).send(error.message);
  }
};

exports.getFeaturedPosts = async (req, res) => {
  try {
    // Vytvorenie dvoch dotazov: jeden pre 3 najnovšie príspevky, druhý pre 3 najpopulárnejšie
    const newestPostsPromise = Post.findAll({
      limit: 3,
      order: [["created_at", "DESC"]],
      include: [{ model: Category, attributes: ["name"] }],
    });

    const mostPopularPostsPromise = Post.findAll({
      limit: 3,
      order: [["view_count", "DESC"]],
      include: [{ model: Category, attributes: ["name"] }],
    });

    // Súčasné spustenie dotazov a čakanie na ich výsledky
    const [newestPosts, mostPopularPosts] = await Promise.all([
      newestPostsPromise,
      mostPopularPostsPromise,
    ]);

    // Vrátenie oboch sád dát v odpovedi
    res.json({
      newestPosts,
      mostPopularPosts,
    });
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    res.status(500).send(error.message);
  }
};
