// Home模块

import { reqCategoryList } from "@/api";

const state = {
  categoryList: [],
};

const mutations = {
  categoryList(state, categoryList) {
    state.categoryList = categoryList;
  },
};

const actions = {
  async categoryList({ commit }) {
    const result = await reqCategoryList();
    commit("categoryList", result.data);
  },
};

export default {
  state,
  mutations,
  actions,
};
