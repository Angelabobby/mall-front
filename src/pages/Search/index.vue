<template>
  <div>Search</div>
</template>

<script>
export default {
  created() {
    console.log((this.$route.params.searchText));
  },
};
</script>

<style lang="less" scoped></style>
