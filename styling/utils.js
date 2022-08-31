function getBreakPointsValues(breakPoints,dimensions){
    for(const breakpoint in breakPoints){
        if (dimensions.width <= breakpoint){
            return breakPoints[breakPoint]
        }
    }
}

export {getBreakPointsValues}