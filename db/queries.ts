import { drizzleDb } from ".";
import { posts } from "../data/posts";
import { categoriesTable, likesTable, postsTable } from "./schemas";
import { postRepository } from "@/repositories/post";
import { userRepository } from "@/repositories/users";
import { users } from "@/data/users";
import { v4 } from "uuid";
(async () => {
  // const postsToInsert = posts.map((post) => {
  //   return {
  //     ...post,
  //     createdAt: new Date(post.createdAt),
  //     updatedAt: new Date(post.updatedAt),
  //   };
  // });
  // const insertPosts = await drizzleDb.insert(postsTable).values(postsToInsert);
  // console.log(insertPosts);
  //   const insertPosts = await drizzleDb.insert(postsTable).values(posts);
  //   console.log(insertPosts);

  // await drizzleDb.insert(postsTable).values(postsToInsert);
  // const insertCategories = await drizzleDb
  //   .insert(categoriesTable)
  //   .values(categories);
  // console.log(insertCategories);

  // const insertUsers = users.map(async (user) => {
  //   await userRepository.createUser(
  //     user.name,
  //     user.lastName,
  //     user.username,
  //     user.password,
  //   );
  // });

  const users = [
    { id: "01e12bf7-1dd1-4a54-87ff-c4d7681fb11d" },
    { id: "1119a422-3595-4377-8cb4-2bbb385071c6" },
    { id: "124f7b13-4985-421e-a72f-8cac24c194d1" },
    { id: "127f7d7e-9940-4494-9dc4-0cedf7493832" },
    { id: "1ae0b611-b124-43d9-8b9f-12d9e1103596" },
    { id: "21319f0c-2702-4dae-a17f-3945101de3bc" },
    { id: "2b0bb833-e3d5-4039-a166-a483c0abe565" },
    { id: "2bb417a8-96e5-4480-8912-f5e1b0d9da4b" },
    { id: "2c89b00f-5dc1-4725-841b-604320884320" },
    { id: "2eaba0c9-0579-45b9-a5ba-cc5d30a4990b" },
    { id: "34f179cd-1429-4aae-9ab3-dc148717e1e7" },
    { id: "37dd799d-c40d-419d-a77f-2d1c535ab792" },
    { id: "42f965cf-3d3e-45b9-8620-5566f935f6ab" },
    { id: "44238e0b-465d-4a1c-801b-c2ff2e93eb85" },
    { id: "4736ceec-d867-47de-96c6-29cb8f92bf7e" },
    { id: "5455e02f-cbe7-448e-abec-341f4dc1f083" },
    { id: "5a66f094-5783-435b-a268-7bbe9e557338" },
    { id: "5ceeb5c5-284e-4d8c-8c61-b1b838554650" },
    { id: "5d3ee14f-a7b3-460c-a178-612a9588e64a" },
    { id: "607061b3-a760-4517-89d8-644c1ddcd699" },
    { id: "673c8bd3-4041-4287-8760-203cbad3f28a" },
    { id: "6e930965-af9f-4255-a99d-d742e98a7efb" },
    { id: "6ef89b77-b6e1-4216-a3f7-fe70ce864978" },
    { id: "717995c6-7951-491c-bfde-705855e59b14" },
    { id: "73f98da1-ff35-4d17-b48b-596d2142f317" },
    { id: "748f023d-6bd9-440b-a38b-0ff00ba1aac4" },
    { id: "79935040-9cf1-465e-8363-b3c4f2ce2432" },
    { id: "7b4fb775-1230-42a6-9afd-e27e63661e76" },
    { id: "82ef6b58-8bd5-4f91-997b-86630af8069c" },
    { id: "83ea8515-8087-4884-9051-0a3355be4471" },
    { id: "95608ab5-22da-4563-b8d9-30382c4134ae" },
    { id: "9c78efa9-db33-4f90-aa67-805fe6fb5902" },
    { id: "9dc4ebe9-ac13-44f7-91d0-efbda85390a9" },
    { id: "a42e5e57-8b96-4be6-8356-27e2547239fb" },
    { id: "a8cb9090-143a-4c1a-b64e-c0121191c7ee" },
    { id: "ac08bdfb-7573-42e1-b4c1-6c32bce19a43" },
    { id: "af34ca34-c231-463e-99a9-59e9efab94d5" },
    { id: "b1808d4d-ffd9-4660-96dc-07a2eb4265dc" },
    { id: "b80496b4-528a-41a7-a640-dc1080785d1f" },
    { id: "ca6caf6c-aae9-4bed-ad06-9c415a4a4bfc" },
    { id: "cda8f4ca-0ce0-4683-8dcb-8c57b501d197" },
    { id: "d4d67e4f-f9d0-45a6-9048-4b880d6b07b0" },
    { id: "d4f0c665-6d55-4756-aca1-9165c0d0550e" },
    { id: "d6ac1f2f-12b7-4ccc-9db0-637528b3487e" },
    { id: "d9cbaea7-d730-414b-a3af-cb1457bbaa54" },
    { id: "db488b4f-629f-4a18-b342-f2067a8ac925" },
    { id: "dcd32e5f-3798-4c3f-a117-059c37d43c61" },
    { id: "dd767ddf-89a6-4c98-8a46-14377c1795bb" },
    { id: "e15a70e9-aa0a-4642-8d28-5617fd9c3feb" },
    { id: "ec13c563-7fca-48b3-8aae-a4baf49857ae" },
    { id: "f0f7519e-65a4-4289-b4b8-667e012feb6d" },
    { id: "f1c26b95-6bc1-4ecb-b2d7-4dedc27ab5b1" },
    { id: "fce13746-87d0-4563-9d28-cd81f84c042a" },
    { id: "fd6a43c5-7fdd-4bd0-9a6d-37a03c5ab18c" },
  ];

  const posts = [
    { id: "00a994c8-0f87-4ebf-b6c0-d6238181c011" },
    { id: "01c9de5e-4431-41c2-91d1-b4b1d7ab13b6" },
    { id: "04e5dbb8-229a-46e5-8828-f79902f0e9cd" },
    { id: "06cb69c5-bd31-4d69-8e48-bcd33c2c18f5" },
    { id: "0dcb25a2-afd5-4860-a4a8-0f5ddd637993" },
    { id: "1" },
    { id: "17bc0197-c66a-4df9-919e-64ad0800df26" },
    { id: "2" },
    { id: "21c38dd7-e99b-47fb-86a6-acb2469f7be8" },
    { id: "229620aa-60f1-4d1a-b01a-7c406597b40a" },
    { id: "29ec5901-8c97-4046-969f-7990bd3679fb" },
    { id: "3" },
    { id: "3111fd0b-041e-41fb-85fd-c4046e355b9d" },
    { id: "390f5a02-5f2a-4d9d-a7df-1743a6f80243" },
    { id: "3b0db776-f5c4-4e80-8d32-951f22e138d1" },
    { id: "41073359-509b-4d40-8d06-76bfdab76223" },
    { id: "57f4902b-0c98-4491-bbe9-168d72aa0090" },
    { id: "5aac739e-f060-46e7-b6d2-d9769ae8bda1" },
    { id: "61e1f63e-9d01-472b-97b3-889d7892e7b6" },
    { id: "6af43592-36cb-4035-baad-64a5f86f9c79" },
    { id: "70b80961-b9b7-4821-bb75-6760f681c58a" },
    { id: "73d3a09f-4bdc-43f7-aea4-40e644c531da" },
    { id: "74f10994-421b-44fb-aeec-1325983e4f2a" },
    { id: "77a126cb-ec28-41b2-9f3f-6d2d2ce534ee" },
    { id: "7c931a34-02f5-436e-a491-c416d73eb13a" },
    { id: "882b6803-7898-4229-a354-f5226bb8d88d" },
    { id: "8cfb10cc-733a-49eb-a571-0233dcf53327" },
    { id: "8ff3f1cb-0c3c-434a-afdc-aab4bee23135" },
    { id: "90303ac7-6fc8-48e0-8356-413aea608b45" },
    { id: "90e1aa49-b78b-45ba-9ec5-8600290e8cc5" },
    { id: "91831bc5-9b6e-46f3-a007-222adfa6536f" },
    { id: "9451583e-e779-4fce-84dd-f66d56dce900" },
    { id: "9a2cce4d-3900-4270-bfe0-87925d92e1b3" },
    { id: "9a37bda0-79fe-4c93-86fb-9b7f7732a975" },
    { id: "a2eb6185-82b6-45cb-8dd7-64dec2c7cfb6" },
    { id: "a57b36df-2fe1-468b-9238-36bc496d2897" },
    { id: "a64aaf48-0fde-4d95-8d97-8f7daac8a86f" },
    { id: "a8ee38bd-8187-4072-9469-16108f772d5b" },
    { id: "aaed8d2c-fe07-4eb1-b345-8ff7eb1d9865" },
    { id: "b3b45ed6-0291-4034-a33b-1e3123ae4032" },
    { id: "b9c18a63-8265-4bab-876a-cf537b9fbd70" },
    { id: "bb2be33c-a6f2-490e-bddb-7c7056b4a6dd" },
    { id: "bf205d87-d171-4183-949b-c726ee209910" },
    { id: "c076ac24-7e01-4b76-aa37-4bbc03a7ef88" },
    { id: "c820c73d-0f8e-436c-94eb-583b5526101a" },
    { id: "cb93d6cc-d961-41e7-b1a0-2501e8948c43" },
    { id: "d8bebcc9-82c2-4923-b502-19c2d7483ea7" },
    { id: "e1ac6dcc-04e6-4510-9108-9e7f064cf08a" },
    { id: "e27890d0-c889-47dd-861e-328d37dc8261" },
    { id: "e32a4e83-2b01-4cb4-8464-1a0d0113fe71" },
    { id: "e8471ab9-930c-40a1-bd72-21cea128b638" },
    { id: "f4c4cf8a-03d7-4e97-afaa-9630b3bf29d1" },
    { id: "f4ff4e72-3427-4163-983b-5614fe696d00" },
    { id: "ff9f34a9-b4e5-49c9-a068-49d82e9f77d8" },
  ];

  // const shuffle = <T>(array: T[]): T[] => {
  //   return [...array].sort(() => Math.random() - 0.5);
  // };

  const seedLikes = async () => {
    const createdAt = new Date();
    // for (const postId of posts) {
    //   const likesAmount = Math.floor(Math.random() * 35);
    //   const selectedUsers = shuffle([...users]).slice(0, likesAmount);

    //   for (const userId of selectedUsers) {
    //     try {
    //       // console.log("entrei no try");
    //       const q = await drizzleDb.insert(likesTable).values({
    //         postId: postId.id,
    //         userId: userId.id,
    //         createdAt: new Date(),
    //       });

    //       console.log("query completa");
    //       console.log(q);
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // }
  };

  seedLikes();
})();
