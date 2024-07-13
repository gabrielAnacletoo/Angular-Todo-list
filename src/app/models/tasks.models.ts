

export interface Tasks {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
    created_at: Date;
    updated_at: Date;
    editing?: boolean; 
}