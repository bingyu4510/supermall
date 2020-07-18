import {
    debounce
} from './utils'
export const itemListenerMixin = {
    data() {
        return {
            itemImgListence: null,
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 500);
        this.itemImgListence = () => {
            this.newRefresh();
        };
        this.$bus.$on("itemImageLoad", this.itemImgListence);
    }
}