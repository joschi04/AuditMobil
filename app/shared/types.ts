export class Frage{
    public titel:string;
    public bezeichnung:string;
    public risiko:number;
    public antwort:string;
};

export class AntwortViewModel{
    public checked:boolean;
    constructor (public caption:string,public value:string){}
};

export class AnwortListViewModel{
    public Antworten:AntwortViewModel[] = new Array<AntwortViewModel>();

    constructor (){
        this.Antworten.push(new AntwortViewModel("Ja","ja"));
        this.Antworten.push(new AntwortViewModel("Nein","nein"));
        this.Antworten.push(new AntwortViewModel("Unbekannt","unbekannt"));
    }
};