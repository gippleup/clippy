import { createAction } from "@reduxjs/toolkit";
import { ArticleIndicator } from "src/api/local/schema";

const unclip = createAction<ArticleIndicator>('searchResult/unclip');
const clip = createAction<ArticleIndicator>('searchResult/clip');

export default {
  clip,
  unclip,
}