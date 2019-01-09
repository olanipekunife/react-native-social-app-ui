import libmoji from 'libmoji';

export const Bitmoji = () => {
    //0 for male, 1 for female
    // buildPreviewUrl(pose, scale, gender, style, rotation, traits, outfit)
    const gender = libmoji.genders[libmoji.randInt(2)];
    const style = libmoji.styles[2];
    //const style = libmoji.styles[libmoji.randInt(3)];
    //[["bitstrips",1],['bitmoji',4],["cm",5]];
    const traits = libmoji.randTraits(libmoji.getTraits(gender[0], style[0]));
    const outfit = libmoji.randOutfit(libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands(gender[0]))));
    
    return libmoji.buildPreviewUrl('head', 1, gender[1], style[1], 0, traits, outfit);
};
