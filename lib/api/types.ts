export type Category = {
  title: string;
};

export interface Brand {
  name: string;
  logo: {
    url: string;
  };
}

export interface Project {
  category: Category;
  slug: string;
  title: string;
  videoEmbedLink: string;
  year: number;
}
