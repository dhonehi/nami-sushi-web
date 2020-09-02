<template>
  <div>
    <top-bar @drawerEvent="editMargin" @search="search"/>
    <div class="pages">
      <div class="pages__content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";

export default {
  name: "pages",
  components: {
    TopBar
  },
  methods: {
    search(value) {
      this.$emit('search', value);
    },
    editMargin() {
      const pages = document.querySelector('.pages');
      pages.classList.toggle('pages_margin_none');
    }
  }
}
</script>

<style lang="scss" scoped>
.pages {
  width: 100%;
  margin-top: 80px;
  padding-top: 20px;

  &_margin_none {
    margin-top: 0 !important;
  }

  @media screen and (max-width: 600px) {
    margin-top: 58px;
    padding-top: 0;
  }

  &__content {
    margin: 0 auto;
    max-width: 1130px;

    @media screen and (max-width: 860px) {
      width: 100%;
    }
  }
}

.page-content {
  margin: 0 auto;
  max-width: 1130px;

  @media screen and (max-width: 1000px) {
    margin-left: 10px;
  }

  /*@media screen and (max-width: 1150px) {
      width: 1000px;
  }*/

  /*@media screen and (max-width: 930px) {
      width: 850px;
  }
  @media screen and (max-width: 860px) {
      max-width: 100%;
      width: 100%;
      margin-left: 10px;
  }*/
}
</style>