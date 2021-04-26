export type Category = {
  title: string;
};

export interface Project {
  category: Category;
  slug: string;
  title: string;
  videoEmbedLink: string;
  year: number;
}
