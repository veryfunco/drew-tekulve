import { fetchFromContentful } from "./fetchFromContentful";
import { Brand } from "./types";

export async function aboutData() {
  return fetchFromContentful<{
    aboutPageCollection: {
      items: {
        clientsCollection: {
          items: Brand[];
        };
      }[];
    };
  }>(
    `query {
      aboutPageCollection(limit: 1) {
        items {
          clientsCollection {
            items {
              name
              logo {
                url
              }
            }
          }
        }
      }
    }`
  );
}
