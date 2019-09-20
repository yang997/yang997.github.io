<template>
  <div class="student-list content">
    <stu-search></stu-search>
    <stu-table></stu-table>
    <turn-page></turn-page>
    <model v-if="showModel"></model>
  </div>
</template>

<script>
import stuSearch from '../components/stuSearch'
import stuTable from '../components/stuTable'
import turnPage from '../components/turnPage'
import model from '../components/model'
import { mapState } from 'vuex';

export default {
  components: {
    stuSearch,
    stuTable,
    turnPage,
    model
  },
  computed: {
    ...mapState(['showModel'])
  },
 
};
</script>

<style >
</style>