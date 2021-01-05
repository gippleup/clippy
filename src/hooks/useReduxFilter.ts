import { ReduxRootState } from "@redux/schema";
import { useDispatch, useSelector } from "react-redux";
import filterActions from '@redux/actions/filter';
import { QueryStateStatus } from "@redux/reducers/query";
import { ReduxHookMethod } from "./schema";

const selectFilter = (state: ReduxRootState) => state.filter;

const useQuery = () => {
  const filterState = useSelector(selectFilter);
  const dispatch = useDispatch();
  const methods: ReduxHookMethod<typeof filterActions> = {
    addPublisher: (publisher) => dispatch(filterActions.addPublisher(publisher)),
    removeAllPublisher: () => dispatch(filterActions.removeAllPublisher()),
    removePublisher: (publisher) => dispatch(filterActions.removePublisher(publisher)),
    selectAllPublisher: () => dispatch(filterActions.selectAllPublisher()),
    setSort: (sort) => dispatch(filterActions.setSort(sort)),
  }
  return {
    state: filterState,
    methods,
  };
}

export default useQuery;