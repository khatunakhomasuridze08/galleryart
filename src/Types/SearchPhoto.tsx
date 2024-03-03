import { Photo } from "./Photo"

export type SearchPhoto = {
  results: Photo[],
  total: number,
  total_pages: number
}