<template>
  <RouterView></RouterView>
</template>

<script lang="ts">
export default {

}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,300,700);
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,400;0,600;1,400&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #19191d;
  color: white;
  font-family: 'Roboto', sans-serif;
}

.profit-color {
    color: #41B883;
}

.disprofit-color {
    color: #b84148;
}
</style>
