//interface of Userdata 
export interface User {
    uid: string;
    email: string;
    displayName: string;
}

//interface for Data(Temperate, SP02 Level, Pulse Rate) Documents
export interface Data{
    id?: string;
    value: string;
    property: string;
    date: string;    
}