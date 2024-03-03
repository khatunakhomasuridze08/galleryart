import { PhotoUrl } from "./PhotoUrl";

export type Photo = {
  id: string;
  description: string;
  urls: PhotoUrl,
  likes: number,
  views: number,
  downloads: number
};