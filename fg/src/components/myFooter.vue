<template lang="html">
  <footer class="footer">
    <p>此生无悔入东方，来世愿入幻想乡</p>
  </footer>
</template>

<script>
export default {
  name: "myFooter"
}
</script>

<style lang="sass">
  .footer
    width: 100%
    height: 9.5rem
    background: linear-gradient(to top,var(--main-color),var(--second-color))
    box-shadow: 0 -2px 3px silver
    overflow: hidden
    p
      margin-top: 6.5rem
      text-align: center
      font-size: 14px
      color: white
</style>
