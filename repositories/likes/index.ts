import { DrizzleLikesRepository } from "./drizzle-likes-repository";
import { LikesRepository } from "./likes-repository";

export const likesRepository: LikesRepository = new DrizzleLikesRepository();
