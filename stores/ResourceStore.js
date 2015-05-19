import {BaseStore} from 'fluxible/addons';
import ResourceStoreUtil from './utils/ResourceStoreUtil';
let utilObject = new ResourceStoreUtil();

class ResourceStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.cleanResource();
    }
    updatePropertyList(payload) {
        this.graphName = payload.graphName;
        this.resourceURI = payload.resourceURI;
        this.currentCategory = payload.currentCategory;
        // this.properties = payload.properties;
        this.properties = utilObject.preservePropertiesOrder(this.properties, payload.properties);
        this.emitChange();
    }
    cleanResource() {
        this.properties = [];
        this.graphName = '';
        this.currentCategory = 0;
        this.resourceURI = '';
    }
    getState() {
        return {
            graphName: this.graphName,
            resourceURI: this.resourceURI,
            currentCategory: this.currentCategory,
            properties: this.properties
        };
    }
    dehydrate() {
        return this.getState();
    }
    rehydrate(state) {
        this.properties = state.properties;
        this.resourceURI = state.resourceURI;
        this.graphName = state.graphName;
        this.currentCategory = state.currentCategory;
    }
}

ResourceStore.storeName = 'ResourceStore'; // PR open in dispatchr to remove this need
ResourceStore.handlers = {
    'LOAD_RESOURCE_SUCCESS': 'updatePropertyList',
    'CLEAN_RESOURCE_SUCCESS': 'cleanResource'
};

export default ResourceStore;
