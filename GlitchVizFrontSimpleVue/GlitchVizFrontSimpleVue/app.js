const jsonURL = "https://glitchvisualizer.firebaseio.com/users.json?print=pretty"



const vm = new Vue({
    el: '#app',
    data: {
        results: [],
        value: 0,
    },
    mounted() {
        this.getResults();
    },
    methods: {
        getResults(section) {
            axios.get(jsonURL).then((response) => {
                this.results = response.data;
        }).catch( error => { console.log(error); });
        }
    },
    filters: {
        toPercentage: function (value) {
            if (!value) return '';
            value = Math.round((value) * 100);
            return value + "%"
        },
        toFullNumber: function (value) {
            if (!value) return '';
            value = Math.round((value) * 100);
            return value
        },
        substringNumber: function (value, substringVal) {
            if (!value) return '';
            value = value.toString();
            value = value.substring(0, substringVal);
            return value
        },
        removeNullProps: function (object) {
            return _.reject(object, (value) => value === null);
        }
    },
    computed: {
        // a computed getter
        reversedMessage: function () {
            // `this` points to the vm instance
            return this.message.split('').reverse().join('')
        },
        dynamicStyle: function(red, green, blue) {
            var red = 30;
            var green = 30;
            var blue = 30;
            return {
                // in the case of redComp, greenComp and blueComp are a vue prop or data
                color : `rgb(${red}, ${green}, ${blue});`,
            };
        },
        nonNullResults: function() {

                return this.results.slice(40, 50)
        }
    }
});