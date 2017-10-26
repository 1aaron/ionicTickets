export class ShareService {  
    
    idUser: string;
    ticket;

    constructor() {
        this.idUser = 'Blank';
        this.ticket = {};
    }

    setTicket(ticket){
        this.ticket = ticket;
    }

    setUserId(userId) {
        this.idUser = userId;      
    }

    getTicket(){
        return this.ticket;
    }
    getUserId() {
        return this.idUser;
    }   
}