// @ts-check

const app = new Vue({
  el: '#app',
  data: {
    title: 'A list of users',
    users: null,
    request: {
      url: 'https://randomuser.me/api/?results=',
      upperLimit: 30,
      lowerLimit: 1
    },
    invalid: false
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData(qty = this.request.lowerLimit) {
      const res = await fetch(`${this.request.url}${qty}`);
      const data = await res.json();
      this.users = data.results;
    },

    handleSubmit(e) {
      e.preventDefault();
      const value = +e.target.search.value;

      if (!isNaN(value) && this.isValid(value)) {
        this.fetchData(value);
        this.invalid = false;
      } else {
        this.invalid = true;
      }
    },

    isValid(value) {
        return value >= this.request.lowerLimit && value <= this.request.upperLimit;
    },

    capitalise(str = '') {
      return str.replace(/[a-z]/, str[0].toLocaleUpperCase());
    }
  },

  computed: {
    hasUsers() {
      return this.users && this.users.length > 0;
    },

    errorMessage() {
      const { upperLimit, lowerLimit } = this.request;
      return `Must be greater than ${lowerLimit} and less than ${upperLimit}`;
    }
  }
});
