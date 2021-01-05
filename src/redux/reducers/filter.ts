import { RegisteredPublisher } from "@redux/schema/publishers"
import { createReducer } from "@reduxjs/toolkit"
import actions from '@redux/actions/filter'
import { ArticleSearchOption } from "@api/news/nyTimes"

type FilterState = {
  publisher: RegisteredPublisher[];
  sort: ArticleSearchOption["sort"];
}

const initialState: FilterState = {
  publisher: ["nyTimes"],
  sort: "relevance",
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setSort, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(actions.addPublisher.fulfilled, (state, action) => {
      state.publisher = action.payload.publisher;      
    })
    .addCase(actions.removeAllPublisher.fulfilled, (state, action) => {
      state.publisher = action.payload.publisher;
    })
    .addCase(actions.removePublisher.fulfilled, (state, action) => {
      state.publisher = action.payload.publisher;            
    })
    .addCase(actions.selectAllPublisher.fulfilled, (state, action) => {
      state.publisher = action.payload.publisher;            
    })
})

export default reducer;