export interface Meeting {
    uid: string,
    controlNo: string
    title: string,
    description: string,
    project: Project,
    date: Date,
    startTime: string,
    endTime: string,
    location: string,
    status: string,
    participants: Participant[],
    topics: Topic[],
    recommendations: Recommendation[],
   // "agreements": []
}

export interface Project {
    uid: string,
    name: string
}

export interface Participant {
    uid: string,
    shortName: string,
    email: string
}

export interface Topic {
    uid: string,
    name: string
}

export interface Recommendation {
    uid: string,
    question: string,
    answer: string,
    answeredBy: string
    comments: string,
    date: Date,
    accessMode: string,
    status: string
}

export function EmptyMeeting() {
    const empty: Meeting = {
        uid: '',
        controlNo: '',
        title: '',
        description: '',
        project: EmptyProject(),
        date: new Date,
        startTime: '',
        endTime: '',
        location: '',
        status: '',
        participants: [],
        topics: [],
        recommendations: [],
       // "agreements": []
    }

    return empty;   
}

export function EmptyProject() {
    const empty: Project = {
        uid: '',
        name: ''
    }

    return empty;
}

export function EmptyParticipant() {
    const empty: Participant = {
        uid: '',
        shortName: '',
        email: ''
    }

    return empty;
}

    
    
    
   
    