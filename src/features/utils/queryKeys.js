export const QK = {
  session: ["session"],
  profile: (userId) => ["profile", userId],
  favorites: (userId) => ["favorites", userId],
  comments: (targetId) => ["comments", targetId],
};
