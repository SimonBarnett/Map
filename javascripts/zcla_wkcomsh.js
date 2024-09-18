// The planner class, which extends the oDataClass.
class ZCLA_WKCOMSCH extends oDataClass{
    constructor() {        
        super("PLANNER");
    }

    // Get the URL for the oData service
    URL(){
        return "ZCLA_WKCOMSCH?$filter=(YR eq "+ this.params.get("yr") +") and (WK eq "+ this.params.get("wk") +") "+
        "and (USERLOGIN eq '"+ this.params.get("sh")  +"')&"+
        "$expand=ZCLA_SCHEDBRANCH_SUBFORM($select=BRANCHNAME,BRANCHDES)";
    }

    // Handle the response from the oData service   
    onLoad(response){     
        this.data = response['value'].map(function (i, index) {
            let oZCLA_WKCOMSCH = {
                ID: index,
                YR: i.YR,
                WK: i.WK,
                DAY1: i.DAY1,
                USERLOGIN: i.USERLOGIN,
                LAT: i.LAT,
                LONG: i.LONG,                    
                ZCLA_SCHEDBRANCH_SUBFORM : i.ZCLA_SCHEDBRANCH_SUBFORM.map(function (i, index) {
                    let oZCLA_SCHEDBRANCH = {
                        ID: index,
                        BRANCHNAME: i['BRANCHNAME'],
                        BRANCHDES: i['BRANCHDES'],                            
                    }
                    return oZCLA_SCHEDBRANCH;
                }),
            }
            return oZCLA_WKCOMSCH;
        });           
    }          

}