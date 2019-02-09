const prop = 'initialValue';
const event = 'change';

const Wrapper = {
    model: { prop, event },
    data: () => ({value: ''}),
    props: [prop],
    created() {
        this.value = this.initialValue
    },
    watch: {
        value() { this.$emit(event, this.value)}    
    }
};

export default Wrapper;