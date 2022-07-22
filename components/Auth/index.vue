<template>
<v-row justify="center" align="center">
  <v-card width="500">
    <v-card-title>{{ title }}</v-card-title>

    <v-card-text>
        <slot name="content"></slot>
    </v-card-text>

    <v-card-actions>
        <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</v-row>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style>

</style>