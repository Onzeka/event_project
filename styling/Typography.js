const typeScale ={
    headline1: {
        fontSize: 34,
        fontWeight: 300,
        letterSpacing: 0.25
    },
    headline2: {
        fontSize: 24,
        fontWeight: 500,
        letterSpacing: 0
    },
    headline3: {
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: 0.15
    },
    subtitle1: {
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 0.15
    },
    subtitle2: {
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: 0.15
    },
    body1: {
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 0.5
    },
    body2: {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: 0.25
    },
    button: {
        fontSize:14,
        fontWeight: 700,
        letterSpacing: 1.25,

    },
    caption:{
        fontSize: 12,
        fontWeight: 500,
        letterSpacing:0.4
    },
    overline:{
        fontSize:10,
        fontWeight:500,
        letterSpacing:1.5
    }

}



class Typography{
    constructor(globalFont,fontOptions){
        for(const textType in typeScale){
            this[textType] = {
                ...typeScale[textType],
                fontFamily: fontOptions[textType] ?? globalFont
            }
        }

    }
}

export default Typography