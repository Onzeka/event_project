import { getBreakPointsValues } from "./utils";

const breakPoints =  new Map([
    (599,{marginSize:16,bodySize:'scaling',nCols:8,gutterSize:8}),
    (904,{marginSize:32,bodySize:'scaling',nCols:8,gutterSize:16}),
    (1239,{marginSize:32,bodySize:'scaling',nCols:8,gutterSize:16})
])


class Grid{
    constructor(dimensions){
        gridValues = getBreakPointsValues(breakPoints,dimensions)
        this.setValues(...gridValues,dimensions)
    }
    setValues(nCols,marginSize,gutterSize,bodySize,dimensions){
        this.nCols = nCols;
        this.gutterSize = gutterSize;
        //type check needed
        this.bodySize = bodySize ? typeof(bodySize) == "number": dimensions.width - 2*marginSize;
        this.marginSize = marginSize ? typeof(marginSize) == "number": Math.floor((dimensions.width - bodySize)/2);
        this.layout = this.getLayout();
        this.spacing = this.getSpacing();

    }
    getLayout() {
        let layout = new Object();
        let colSize = Math.floor(this.bodySize/this.nCols)
        for(let i = 0 ; i <= this.nCols; i++){
            layout[`${i}-col`] = i*colSize + Math.max(0,i-1)*this.gutterSize
        }
        return layout
    }
    getSpacing(){
        return {small: Math.floor(this.gutterSize/2),medium: this.gutterSize,large:2*this.gutterSize}
    }
    
}
export default Grid