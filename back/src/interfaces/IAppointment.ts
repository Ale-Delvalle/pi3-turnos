interface IAppointment {
    id:number,
    date:Date,
    time:string,
    userId:number,
    description:string,
    status:'Active'|'Cancelled'|'Completed'
}

export default IAppointment;