import {proxy} from 'valtio'
const state = proxy({
    intro:true,
    color: "#FFFFFF",
    isLogoTexture : true,
    isFullTexture :false,
    logoDecal :'../public/logo.png',
    fullDecal :'./threejs.png',

});
export default state;