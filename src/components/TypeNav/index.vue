<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort">
        <div class="all-sort-list2" @mouseleave="resetIndex">
          <div
            class="item"
            v-for="(c1, i1) in categoryList"
            :key="c1.categoryId"
            :class="{ activeItem: currentIndex === i1 }"
            @mouseenter="changeIndex(i1)"
            @click="goSearch"
          >
            <h3>
              <a :data-categoryname="c1.categoryName" :data-category1id="c1.categoryId">{{ c1.categoryName }}</a>
            </h3>
            <div class="item-list clearfix" :style="{ display: currentIndex === i1 ? 'block' : 'none' }">
              <div class="subitem">
                <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dt>
                    <a :data-categoryname="c2.categoryName" :data-category2id="c2.categoryId">{{ c2.categoryName }}</a>
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a :data-categoryname="c3.categoryName" :data-category3id="c3.categoryId">{{
                        c3.categoryName
                      }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { throttle } from "lodash";

export default {
  mounted() {
    // 挂载后，发送请求获取三级联动的树形数据
    this.$store.dispatch("categoryList");
  },

  data() {
    return {
      // 三级联动，当前所选的index
      currentIndex: -1,
    };
  },

  methods: {
    // 三级联动，修改当前所选的index；使用throttle节流函数，优化JS性能、提高用户体验和
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    // 三级联动，重置当前所选的index
    resetIndex() {
      this.currentIndex = -1;
    },

    // 三级联动，点击跳转到search并携带参数；使用事件委托，在父元素监听
    goSearch(event) {
      const location = { name: "Search" };
      const { categoryname, category1id, category2id, category3id } = event.target.dataset;
      const query = { categoryname };
      if (category1id) {
        query.category1id = category1id;
      } else if (category2id) {
        query.category2id = category2id;
      } else if (category3id) {
        query.category3id = category3id;
      }
      location.query = query;
      this.$router.push(location);
    },
  },

  computed: {
    // 从Vuex中state的数据映射到组件自身，方便引用
    ...mapState({ categoryList: (state) => state.home.categoryList }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        .activeItem {
          background: skyblue;
        }
      }
    }
  }
}
</style>
