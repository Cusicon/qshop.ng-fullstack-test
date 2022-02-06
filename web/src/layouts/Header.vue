<template>
  <div id="main-header">
    <div class="slicknav_menu">
      <a
        href="#"
        aria-haspopup="true"
        tabindex="0"
        class="slicknav_btn slicknav_collapsed"
        style="outline: none"
        ><span class="slicknav_menutxt"></span
        ><span class="slicknav_icon slicknav_no-text"
          ><span class="slicknav_icon-bar"></span
          ><span class="slicknav_icon-bar"></span
          ><span class="slicknav_icon-bar"></span></span
      ></a>
      <ul
        class="slicknav_nav slicknav_hidden"
        aria-hidden="true"
        role="menu"
        style="display: none"
      >
        <li
          class="
            menu-item menu-item-type-custom menu-item-object-custom
            current-menu-item current_page_item
            menu-item-home menu-item-14
          "
        >
          <a href="/" aria-current="page" role="menuitem" tabindex="-1">Home</a>
        </li>
        <li
          class="
            menu-item
            menu-item-type-post_type
            menu-item-object-page menu-item-20
          "
        >
          <router-link :to="`/products`" role="menuitem" tabindex="-1">
            My Products
          </router-link>
        </li>
      </ul>
    </div>

    <header id="header">
      <div class="real-container">
        <div class="logo_cont">
          <router-link :to="`/`">
            <img src="@/assets/img/logo.png" alt="logo" />
          </router-link>
        </div>

        <div class="header_menu">
          <ul id="header_menu_id" class="menu">
            <li
              id="menu-item-14"
              class="
                menu-item menu-item-type-custom menu-item-object-custom
                current-menu-item current_page_item
                menu-item-home menu-item-14
              "
            >
              <router-link :to="`/`" aria-current="page"> Home </router-link>
            </li>
            <li
              id="menu-item-15"
              class="
                menu-item
                menu-item-type-post_type
                menu-item-object-page menu-item-15
              "
            >
              <router-link :to="`/products`">My Products</router-link>
            </li>
          </ul>

          <div class="clear"></div>
        </div>

        <div class="header_search">
          <form>
            <span v-if="!isAuthenticated">
              <router-link to="/signup" class="btn" style="margin: auto 5px">
                Sign Up
              </router-link>
              <router-link
                to="/login"
                class="btn product-action-view"
                style="margin: auto 5px"
              >
                Login
              </router-link>
            </span>
            <input type="text" placeholder="Search" name="s" id="s" />
          </form>
        </div>

        <div class="clear"></div>
      </div>
    </header>

    <div class="header_spacing" style="height: 82px"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>
