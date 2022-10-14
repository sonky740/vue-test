import { RootState } from './state';

const mutations = {
  increase(state: RootState) {
    state.xCount++;
  },
};

export default mutations;
