export default defineEventHandler(async () => {
  const storage = useStorage('storage');

  // Fetch users here, transform with gallery, and return a ready to display
  // data
  return await storage.getItem('/gallery/gallery-db.json');
});
