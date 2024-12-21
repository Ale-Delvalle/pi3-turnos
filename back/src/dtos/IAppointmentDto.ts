interface IAppointmentDto{
    date:Date;
    time:string;
    status: "Active" | "Cancelled" | "Completed"
    userId:number,
    description:string
}

export default IAppointmentDto