const jsonURL = "https://glitchvisualizer.firebaseio.com/newglitch.json"
const turkURL = "https://api.myjson.com/bins/r3wy6"


// const jsonURL = "https://glitchvisualizer.firebaseio.com/reduced.json?print=pretty"



const vm = new Vue({
    el: '#app',
    data: {
        results: [],
        value: 0,
        search: '',
        lowPoint: 1,
        highPoint: 10,
        turkResults: []
    },
    mounted() {
        this.getResults();
        this.getResultsTurk();
    },
    methods: {
        getResults() {
            axios.get(jsonURL).then((response) => {
                preRes =  response.data.filter(function(item) {
                    return item !== null;
                });
                this.results =  preRes;

            }).catch( error => { console.log(error); });
        },
        getResultsTurk() {
            axios.get(turkURL).then((response) => {
                preResTurk =  response.data;
                this.turkResults =  preResTurk;

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
        filteredResults: function () {

            if (this.highPoint - this.lowPoint > 150)
                {

                }
            else {
                angaba = this.results.slice(this.lowPoint-1,this.highPoint).filter((result) =>{
                    jsonString = JSON.stringify(result);
                    return jsonString.match(this.search);
                })
                return angaba;
            }

        },
        componentToHex: function(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        },
        rgbToHex: function(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
    }
});
