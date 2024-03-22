export default {
  cache_time: 36000, // 10 hrs in secods
};
const folders = {
  CATEGORY_FOLDER: "categories_logo",
};

const secret_keys = {
  token_secret: "jkdhjfkhfkjdkljaklsdjlksdjlksd",
};

const redis_keys = {
  all_categories: "byt_all_categories",
  get_content: "byt_get_content:id:subcat:pn",
  get_content_by_id: "byt_get_content_by_id",
};

export { folders, secret_keys, redis_keys };
